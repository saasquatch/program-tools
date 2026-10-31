import { demoMerge } from "./demoMerge";

function makeDefaults() {
  return {
    states: {
      loading: false,
      payoutStatus: "DONE",
      formState: { country: "US", errors: { name: "required" } },
      steps: ["one", "two", "three"],
    },
    data: { rewards: [{ id: "a" }, { id: "b" }] },
    callbacks: {
      onSubmit: () => "default submit",
      onCancel: () => "default cancel",
    },
  };
}

type Defaults = ReturnType<typeof makeDefaults>;

describe("demoMerge", () => {
  describe("merge semantics", () => {
    it("keeps every default when demoData is empty", () => {
      const defaults = makeDefaults();

      expect(demoMerge(defaults, {})).toEqual(defaults);
    });

    it("deep-merges nested objects, letting demoData win on conflicts", () => {
      const result = demoMerge(makeDefaults(), {
        states: { payoutStatus: "HOLD", formState: { country: "CA" } },
      });

      expect(result.states.payoutStatus).toBe("HOLD");
      expect(result.states.formState.country).toBe("CA");
      expect(result.states.loading).toBe(false);
      expect(result.states.formState.errors).toEqual({ name: "required" });
      expect(result.data.rewards).toEqual([{ id: "a" }, { id: "b" }]);
    });

    it("replaces arrays instead of concatenating them", () => {
      const result = demoMerge(makeDefaults(), {
        states: { steps: ["only"] },
        data: { rewards: [{ id: "z" }] },
      });

      expect(result.states.steps).toEqual(["only"]);
      expect(result.data.rewards).toEqual([{ id: "z" }]);
    });

    it("lets an empty array clear a default array", () => {
      const result = demoMerge(makeDefaults(), { data: { rewards: [] } });

      expect(result.data.rewards).toEqual([]);
    });

    it("lets an explicit undefined override a default, like the old deepmerge", () => {
      const demoData: { states: { payoutStatus?: string } } = {
        states: { payoutStatus: undefined },
      };

      const result = demoMerge<Defaults, typeof demoData>(
        makeDefaults(),
        demoData
      );

      expect(result.states.payoutStatus).toBeUndefined();
      expect(result.states.loading).toBe(false);
    });

    it("does not mutate the defaults or demoData", () => {
      const defaults = makeDefaults();
      const demoData = { states: { payoutStatus: "HOLD", steps: ["only"] } };
      const defaultsBefore = JSON.stringify(defaults);
      const demoDataBefore = JSON.stringify(demoData);

      const result = demoMerge<Defaults, typeof demoData>(defaults, demoData);
      result.states.formState.country = "MX";
      result.states.steps.push("extra");

      expect(JSON.stringify(defaults)).toBe(defaultsBefore);
      expect(JSON.stringify(demoData)).toBe(demoDataBefore);
    });
  });

  describe("callback preservation", () => {
    it("keeps default callbacks by reference when demoData does not touch them", () => {
      const defaults = makeDefaults();

      const result = demoMerge(defaults, { states: { loading: true } });

      expect(result.callbacks.onSubmit).toBe(defaults.callbacks.onSubmit);
      expect(result.callbacks.onCancel).toBe(defaults.callbacks.onCancel);
      expect(result.callbacks.onSubmit()).toBe("default submit");
    });

    it("keeps sibling callbacks when demoData overrides one of them", () => {
      const defaults = makeDefaults();
      const onSubmit = () => "demo submit";

      const result = demoMerge(defaults, { callbacks: { onSubmit } });

      expect(result.callbacks.onSubmit).toBe(onSubmit);
      expect(result.callbacks.onCancel).toBe(defaults.callbacks.onCancel);
    });
  });

  describe("prototype-key rejection", () => {
    afterEach(() => {
      delete (Object.prototype as any).polluted;
    });

    it("ignores a top-level __proto__ key", () => {
      const demoData = JSON.parse(
        '{"__proto__": {"polluted": true}, "states": {"payoutStatus": "HOLD"}}'
      );

      const result = demoMerge(makeDefaults(), demoData);

      expect(({} as any).polluted).toBeUndefined();
      expect((result as any).polluted).toBeUndefined();
      expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
      expect(result.states.payoutStatus).toBe("HOLD");
    });

    it("ignores a nested __proto__ key", () => {
      const demoData = JSON.parse(
        '{"states": {"__proto__": {"polluted": true}, "payoutStatus": "HOLD"}}'
      );

      const result = demoMerge(makeDefaults(), demoData);

      expect(({} as any).polluted).toBeUndefined();
      expect((result.states as any).polluted).toBeUndefined();
      expect(Object.getPrototypeOf(result.states)).toBe(Object.prototype);
      expect(result.states.payoutStatus).toBe("HOLD");
    });

    it("ignores constructor and prototype keys", () => {
      const demoData = JSON.parse(
        '{"constructor": {"prototype": {"polluted": true}}, "prototype": {"polluted": true}, "states": {"payoutStatus": "HOLD"}}'
      );

      const result = demoMerge(makeDefaults(), demoData);

      expect(({} as any).polluted).toBeUndefined();
      expect(Object.prototype.hasOwnProperty.call(result, "constructor")).toBe(
        false
      );
      expect(Object.prototype.hasOwnProperty.call(result, "prototype")).toBe(
        false
      );
      expect(result.constructor).toBe(Object);
      expect(result.states.payoutStatus).toBe("HOLD");
    });
  });
});
