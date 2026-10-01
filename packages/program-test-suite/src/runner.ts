import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";
import { describe, it } from "node:test";
import {
  AstBuilder,
  compile,
  GherkinClassicTokenMatcher,
  Parser,
} from "@cucumber/gherkin";
import { IdGenerator } from "@cucumber/messages";
import { findMatch } from "./registry.ts";
import { getWorld } from "./world.ts";

/**
 * Minimal DataTable helper. Steps that receive a data-table argument get this
 * object, which currently only supports `.hashes()` (list of rows keyed by the
 * header row) since that is all the built-in steps need.
 */
export class DataTable<
  T extends Record<string, string> = Record<string, string>,
> {
  private readonly rows: T[];

  constructor(rows: T[]) {
    this.rows = rows;
  }

  hashes(): T[] {
    return this.rows;
  }
}

function stepArgument(argument: any): unknown[] {
  if (!argument) {
    return [];
  }
  if (argument.docString) {
    return [argument.docString.content];
  }
  if (argument.dataTable) {
    const rows: string[][] = argument.dataTable.rows.map((r: any) =>
      r.cells.map((c: any) => c.value),
    );
    const [header, ...body] = rows;
    const tableRows = header
      ? body.map((row) =>
          Object.fromEntries(header.map((h, i) => [h, row[i] ?? ""])),
        )
      : [];
    return [new DataTable(tableRows)];
  }
  return [];
}

async function loadFeatures(featurePath: string) {
  const uuidFn = IdGenerator.uuid();
  const parser = new Parser(
    new AstBuilder(uuidFn),
    new GherkinClassicTokenMatcher(),
  );
  const paths: string[] = [];
  for await (const entry of glob(`${featurePath}/**/*.feature`)) {
    paths.push(entry);
  }
  paths.sort();
  if (paths.length === 0) {
    throw new Error(`No feature files found at path "${featurePath}"`);
  }

  return paths.map((uri) => {
    const gherkinDoc = parser.parse(readFileSync(uri, "utf8"));
    const pickles = compile(gherkinDoc, uri, uuidFn);
    return { uri, gherkinDoc, pickles };
  });
}

export interface RunProgramTestsOptions {
  program: import("@saasquatch/program-boilerplate").types.rpc.Program;
  featurePath: string;
  schema: string | object;
  templateFile: string;
  rulesFile: string;
  featureFilterTags?: string[];
}

export async function runProgramTests(opts: RunProgramTestsOptions) {
  // Disable all logging during tests unless the consumer has already set a
  // level.
  process.env["PROGRAM_LOG_LEVEL"] ??= "none";

  const liveUrl = process.env["SSQT_TEST_SUITE_LIVE_URL"];
  if (liveUrl) {
    console.info(
      `Running program test suite against live program at ${liveUrl}`,
    );
  }

  getWorld().setProgram(opts.program);
  getWorld().loadDefaults(opts.templateFile, opts.schema, opts.rulesFile);

  // Import the built-in steps for their side effect (registration). Consumers
  // are expected to import their own custom step modules before calling this
  // function.
  await import("./steps/index.ts");

  const features = await loadFeatures(opts.featurePath);
  const filterTags = opts.featureFilterTags ?? [];

  for (const { gherkinDoc, pickles } of features) {
    const feature = gherkinDoc.feature;
    if (!feature) {
      continue;
    }

    const featureTags = (feature.tags ?? []).map((t) => t.name);
    if (
      filterTags.length &&
      !filterTags.every((t) => featureTags.includes(t))
    ) {
      continue;
    }

    void describe(feature.name, () => {
      for (const pickle of pickles) {
        const tags = pickle.tags?.map((t) => t.name) ?? [];
        const isDebug = tags.includes("@debug");

        void it(pickle.name, async () => {
          getWorld().reset();
          if (isDebug) {
            console.debug(`===== Before "${pickle.name}" =====`);
          }

          for (const step of pickle.steps ?? []) {
            const match = findMatch(step.text);
            await match.handler(...match.args, ...stepArgument(step.argument));
          }

          if (isDebug) {
            console.debug(`===== After "${pickle.name}" =====`);
          }
        });
      }
    });
  }
}
