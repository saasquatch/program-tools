import { graphql, rest } from "msw";

let prevReq: Object = {};

const lock = {
  locked: false,
  unlock: null as null | (() => void),
};

// block requests on demand
async function maybeLock() {
  if (!lock.locked) return;

  lock.locked = false;
  await new Promise<void>((resolve) => {
    lock.unlock = resolve;
  });
  lock.unlock = null;
};

export const handlers = [
  rest.get("/lastquery", (req, res, ctx) => {
    return res(ctx.body(JSON.stringify(prevReq)));
  }),

  rest.post("/lock", (req, res, ctx) => {
    if (lock.locked) {
      return res(ctx.status(500, "Already locked"))
    }
    lock.locked = true;
    return res(ctx.status(200))
  }),

  rest.post("/unlock", (req, res, ctx) => {
    if (!lock.unlock) {
      // sometimes axios will fire 2 requests, let's be nice about it
      return res(ctx.status(200, "Already unlocked but ok"))
    }
    lock.unlock()
    // TODO forgot to return smh, fix after cleanup
  }),

  graphql.query("MockTest", async (req, res, ctx) => {
    await maybeLock();
    prevReq = req;
    return res(
      ctx.data({
        greeting: {
          message: `Hello, ${req.variables.name}!`,
        },
      })
    );
  }),

  graphql.query("Empty", async (req, res, ctx) => {
    await maybeLock();
    prevReq = req;
    return res(ctx.data({ empty: null }));
  }),

  graphql.query("Empty2", async (req, res, ctx) => {
    await maybeLock();
    prevReq = req;
    return res(ctx.data({ empty: null }));
  }),

  graphql.query("Echo", async (req, res, ctx) => {
    await maybeLock();
    prevReq = req;
    return res(ctx.data({ echo: req.variables }));
  }),
];
