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

export class World {
  static program: types.rpc.Program;
  static defaultIntrospection = "{}";
  static defaultRules = "{}";
  static defaultTemplate: any = {};

  state: Readonly<State>;

  constructor() {
    this.state = this.reset();
  }

  static loadDefaults(
    schemaFile: string,
    templateFile: string,
    rulesFile: string
  ) {
    this.defaultIntrospection = JSON.parse(
      readFileSync(templateFile).toString()
    );
    const schema = JSON.parse(readFileSync(schemaFile).toString());
    this.defaultRules = JSON.parse(readFileSync(rulesFile).toString());
    this.defaultTemplate = deepmerge(this.defaultIntrospection, schema);
  }

  static setProgram(program: types.rpc.Program) {
    this.program = program;
  }

  static getProgram() {
    if (!this.program) throw new Error("The program has to be set");
    return this.program;
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
        rules: World.defaultRules,
        template: World.defaultTemplate,
      },
    };
    return this.state;
  }
}

let world: World | undefined;

export function getWorld() {
  if (!world) world = new World();
  return world as World;
}
