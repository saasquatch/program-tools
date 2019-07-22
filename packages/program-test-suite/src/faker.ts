import {types} from '@saasquatch/program-boilerplate';

type ProgramIntrospectionBody = types.rpc.ProgramIntrospectionBody;

export function getIntrospectionJson(
  template?: any,
  rules?: any,
  rewards?: any[],
): ProgramIntrospectionBody {
  return {
    messageType: 'PROGRAM_INTROSPECTION',
    template,
    rules,
    program: {
      id: 'r1',
      rules,
      rewards,
    },
  };
}
