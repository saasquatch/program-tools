import type {
  JsonDocs,
  JsonDocsTag,
  OutputTargetDocsCustom,
} from "@stencil/core/internal";
import * as ts from "typescript";
import fsSync from "fs";
import path from "path";

const fs = fsSync.promises;

const TEMPLATE = path.resolve(__dirname, "../template/TEMPLATE.ts");

type HasDocsTags = { docsTags: JsonDocsTag[] };

export type GrapesJSModel = {
  tag: string;
  name: string;
  traits: {
    type: string;
    title: string;
    name: string;
    enum?: unknown[];
    enumNames?: unknown[];
  }[];
  uiSchema?: any;
};

export type Config = {
  /** The output directory for the plugin (i.e. docs) */
  outDir: string;
  /** The output file name (i.e. grapes.js) */
  outFile: string;
  templateFile: string;
  /**
   * A static list of GrapesJS components to export
   */
  components: GrapesJSModel[];
};

/**
 * Creates an output target to use in your `stencil.config.ts` file.
 *
 * @param config
 */
export function grapesJsOutput({
  outDir = "docs",
  outFile = "grapesjs.js",
  templateFile = TEMPLATE,
  components = [],
}: Partial<Config>): OutputTargetDocsCustom {
  async function generator(docsJson: JsonDocs) {
    const templateSrc = await fs.readFile(templateFile, { encoding: "utf-8" });
    const stencilComponents = convertToGrapesJSMeta(docsJson);
    const allComponents = [...stencilComponents, ...components];
    const metaSrc = JSON.stringify(allComponents);
    const source = `const components=${metaSrc};
    ${templateSrc}
    `;

    let result = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.System },
    });

    await writeFile(outDir, outFile, result.outputText);
  }
  return {
    type: "docs-custom",
    generator,
  };
}

async function writeFile(outDir: string, file: string, content: string) {
  if (!fsSync.existsSync(outDir)) {
    await fs.mkdir(outDir);
  }
  await fs.writeFile(path.resolve(outDir, file), content, {
    encoding: "utf-8",
  });
}

function convertToGrapesJSMeta(docs: JsonDocs): GrapesJSModel[] {
  return docs.components.filter(isUndocumented).map((comp) => {
    const props = comp.props.filter(isUndocumented);
    const uiSchema = props.reduce(
      (prev, prop) => {
        return {
          ...prev,
          [prop.attr ?? prop.name]: {
            "ui:widget": tagValue(prop.docsTags, "uiWidget"),
            "ui:name": uiName(prop),
            "ui:help": prop.docs,
          },
        };
      },
      {
        "ui:order": jsonTagValue(comp, "uiOrder"),
      }
    );
    return {
      tag: comp.tag,
      name: uiName(comp) ?? comp.tag,
      uiSchema,
      traits: props.filter(isUndocumented).map((p) => {
        return {
          name: p.attr ?? p.name,
          type: uiType(p) ?? p.type,
          title: uiName(p) ?? p.attr ?? p.name,
          enum: jsonTagValue(p, "uiEnum"),
          enumNames: jsonTagValue(p, "uiEnumNames"),
        };
      }),
    };
  });
}

function tagValue(tags: JsonDocsTag[], name: string): string | undefined {
  return tags.find((t) => t.name === name)?.text;
}
function jsonTagValue(tags: HasDocsTags, name: string) {
  const value = tagValue(tags.docsTags, name);
  return value && JSON.parse(value);
}
function hasTag(tagName: string) {
  return (d: HasDocsTags) =>
    d.docsTags?.find((t) => t.name === "tagName") ? true : false;
}

const isUndocumented = () => hasTag("undocumented");
const uiName = (x: HasDocsTags) => tagValue(x.docsTags, "uiName");
const uiType = (x: HasDocsTags) => tagValue(x.docsTags, "uiType");
