import {
  parse,
  OperationDefinitionNode,
  SelectionNode,
  FragmentDefinitionNode,
  FieldNode,
  FragmentSpreadNode,
} from "graphql";
import { graphql, rest } from "msw";

let prevReq: Object = {};

const lock = {
  locked: false,
  unlock: null as null | (() => void),
};

// block requests on demand
async function maybeLock() {
  if (!lock.locked) return;
  console.log("maybeLocked is LOCKED!");
  lock.locked = false;
  await new Promise<void>((resolve) => {
    lock.unlock = () => {
      console.log("maybeLocked is UNLOCKED!");
      resolve();
    };
  });
  lock.unlock = null;
}

export const handlers = [
  rest.get("/lastquery", (req, res, ctx) => {
    return res(ctx.body(JSON.stringify(prevReq)));
  }),

  rest.post("/lock", (req, res, ctx) => {
    if (lock.locked) {
      console.log("FAiled to /lock");
      return res(ctx.status(500, "Already locked"));
    }
    lock.locked = true;
    return res(ctx.status(200));
  }),

  rest.post("/unlock", (req, res, ctx) => {
    if (!lock.unlock) {
      console.log("FAiled to /unlock");
      return res(ctx.status(500, "Already unlocked"));
    }
    lock.unlock();
    return res(ctx.status(200));
  }),

  graphql.query("BatchedQuery", async (req, res, ctx) => {
    await maybeLock();
    const parsedQuery = parse(req.body.query);
    const response = (parsedQuery
      .definitions[0] as OperationDefinitionNode).selectionSet.selections.reduce(
      (response: any, selection: FieldNode | FragmentSpreadNode) => {
        const alias = (selection as any).alias.value;
        const id = alias.split("_")[1];
        switch (selection.name.value) {
          case "greeting":
            return {
              ...response,
              [alias]: {
                message: `Hello, ${req.variables[`name_${id}`]}!`,
              },
            };
          case "empty":
            return {
              ...response,
              [alias]: null,
            };
          case "echo":
            return {
              ...response,
              [alias]: Object.keys(req.variables).reduce(
                (variables, aliasedVar) => ({
                  ...variables,
                  [aliasedVar.replace(`_${id}`, "")]: req.variables[aliasedVar],
                }),
                {}
              ),
            };
          default:
            return response;
        }
      },
      {}
    );
    prevReq = req;
    return res(ctx.data(response));
  }),
];
