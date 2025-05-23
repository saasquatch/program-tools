import { types } from "@saasquatch/program-boilerplate";
import deepmerge from "deepmerge";
import { readFileSync } from "fs";
import { getRandomUser } from "./faker";
import { TenantFlavor } from "./types";

interface State {
  programTriggerResult: any;
  validationReqs: types.rpc.ValidationRequest[];
  assertionResults: {
    [key: string]: any;
  };
  current: Partial<{
    events: any[];
    time: number;
    previous: any;
    user: any;
    referral: any;
    programRewards: any[];
    rules: any;
    template: any;
    featureFlags: string[] | null | undefined;
    flavor: TenantFlavor;
  }>;
}

const deepCopy = (input: any) => JSON.parse(JSON.stringify(input));

export class World {
  private program: types.rpc.Program | undefined;
  private defaultIntrospection = {};
  private defaultRules = {};
  private defaultTemplate: any = {};

  state: Readonly<State>;

  constructor() {
    this.state = this.reset();
  }

  loadDefaults(
    templateFile: string,
    schema: string | object,
    rulesFile: string
  ) {
    this.defaultIntrospection = JSON.parse(
      readFileSync(templateFile).toString()
    );

    const schemaFinal =
      typeof schema === "string"
        ? JSON.parse(readFileSync(schema).toString())
        : schema;

    this.defaultRules = JSON.parse(readFileSync(rulesFile).toString());
    this.defaultTemplate = deepmerge(this.defaultIntrospection, schemaFinal);
  }

  setProgram(program: types.rpc.Program) {
    this.program = program;
  }

  getProgram() {
    if (!this.program) throw new Error("The program has to be set");
    return this.program;
  }

  getDefaultTemplate() {
    return this.defaultTemplate;
  }

  setState(newState: Partial<State>) {
    this.state = deepmerge(this.state, newState, { arrayMerge: (_, a) => a });
    return this;
  }

  reset() {
    const user = getRandomUser("REFERRED");
    this.state = {
      programTriggerResult: {},
      validationReqs: [],
      assertionResults: {},
      current: {
        events: [],
        referral: {},
        programRewards: [],
        previous: undefined,
        user: user,
        rules: deepCopy(this.defaultRules),
        template: deepCopy(this.defaultTemplate),
      },
    };

    return this.state;
  }
}

let world: World | undefined;

export function getWorld() {
  if (world === undefined) {
    world = new World();
  }

  return world as World;
}
