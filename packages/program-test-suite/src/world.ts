import { readFileSync } from "fs";
import deepmerge from "deepmerge";
import { types } from "@saasquatch/program-boilerplate";

import { getRandomUser } from "./faker";

interface State {
  programTriggerResult: any;
  validationReqs: types.rpc.ValidationRequest[];
  assertionResults: {
    [key: string]: any;
  };
  current: Partial<{
    events: any[];
    time: number;
    user: any;
    referral: any;
    programRewards: any[];
    rules: any;
    template: any;
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

  loadDefaults(schemaFile: string, templateFile: string, rulesFile: string) {
    this.defaultIntrospection = JSON.parse(
      readFileSync(templateFile).toString()
    );
    const schema = JSON.parse(readFileSync(schemaFile).toString());
    this.defaultRules = JSON.parse(readFileSync(rulesFile).toString());
    this.defaultTemplate = deepmerge(this.defaultIntrospection, schema);
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
    this.state = {
      programTriggerResult: {},
      validationReqs: [],
      assertionResults: {},
      current: {
        events: [],
        referral: {},
        programRewards: [],
        user: getRandomUser("REFERRED"),
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
