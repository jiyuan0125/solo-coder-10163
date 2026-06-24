import { describe, expect, it, vi } from "vitest";

vi.mock("@commander-js/extra-typings", () => {
  const chainable = (): any =>
    new Proxy(function () { return chainable(); }, {
      get: () => chainable(),
    });
  return {
    Command: class {
      constructor() {
        return chainable();
      }
    },
    Option: class {
      constructor() {
        return chainable();
      }
    },
  };
});

vi.mock("@inquirer/prompts", () => ({
  search: vi.fn(),
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));

vi.mock("@lmstudio/lms-common", () => ({
  text: (strings: TemplateStringsArray, ...values: any[]) =>
    String.raw({ raw: strings }, ...values),
  SimpleLogger: class {},
}));

vi.mock("@lmstudio/lms-isomorphic", () => ({
  terminalSize: () => ({ rows: 24, columns: 80 }),
}));

vi.mock("@lmstudio/sdk", () => ({
  LMStudioClient: class {},
}));

vi.mock("chalk", () => ({
  default: new Proxy({}, {
    get: (_target, prop) => {
      if (typeof prop === "symbol") return () => "";
      const fn = (str: string) => String(str);
      return fn;
    },
  }),
}));

vi.mock("fuzzy", () => ({
  filter: vi.fn(() => []),
}));

vi.mock("zod", () => ({
  z: {
    object: () => ({ parse: () => ({}), safeParse: () => ({ success: true, data: {} }) }),
    string: () => ({}),
    boolean: () => ({}),
    number: () => ({}),
    array: () => ({}),
    enum: () => ({}),
  },
}));

vi.mock("../createClient.js", () => ({
  addCreateClientOptions: vi.fn(),
  createClient: vi.fn(),
}));

vi.mock("../formatBytes.js", () => ({
  formatSizeBytes1000: vi.fn(),
  formatSizeBytesWithColor1000: vi.fn(),
}));

vi.mock("../handleDownloadWithProgressBar.js", () => ({
  handleDownloadWithProgressBar: vi.fn(),
}));

vi.mock("../inquirerTheme.js", () => ({
  fuzzyHighlightOptions: {},
  searchTheme: {},
}));

vi.mock("../logLevel.js", () => ({
  addLogLevelOptions: vi.fn(),
  createLogger: vi.fn(),
}));

vi.mock("../prompt.js", () => ({
  runPromptWithExitHandling: vi.fn(),
}));

vi.mock("../cliPref.js", () => ({
  getCliPref: vi.fn(),
}));

vi.mock("../ProgressBar.js", () => ({
  ProgressBar: class {},
}));

vi.mock("../SimpleFileData.js", () => ({
  SimpleFileData: class {},
}));

vi.mock("../lmstudioPaths.js", () => ({
  lmsKey2Path: "/tmp/lms-key-2",
  cliPrefPath: "/tmp/cli-pref.json",
}));

vi.mock("./parseLmStudioArtifactUrl.js", () => ({
  tryParseLmStudioArtifactUrl: vi.fn(),
}));

import { splitModelNameAndQuantization } from "./get.js";

describe("splitModelNameAndQuantization", () => {
  describe("basic cases", () => {
    it("returns undefined for undefined input", () => {
      const result = splitModelNameAndQuantization(undefined);
      expect(result.modelNameWithoutQuantization).toBeUndefined();
      expect(result.specifiedQuantName).toBeUndefined();
    });

    it("returns empty string for empty string", () => {
      const result = splitModelNameAndQuantization("");
      expect(result.modelNameWithoutQuantization).toBe("");
      expect(result.specifiedQuantName).toBeUndefined();
    });

    it("parses simple model name without quantization", () => {
      const result = splitModelNameAndQuantization("owner/model");
      expect(result.modelNameWithoutQuantization).toBe("owner/model");
      expect(result.specifiedQuantName).toBeUndefined();
    });

    it("parses name@quant", () => {
      const result = splitModelNameAndQuantization("owner/model@Q4_K_M");
      expect(result.modelNameWithoutQuantization).toBe("owner/model");
      expect(result.specifiedQuantName).toBe("Q4_K_M");
    });

    it("parses name@quant where quant looks like a name", () => {
      const result = splitModelNameAndQuantization("model@name");
      expect(result.modelNameWithoutQuantization).toBe("model");
      expect(result.specifiedQuantName).toBe("name");
    });
  });

  describe("@@ escape sequences", () => {
    it("parses escaped @@ followed by quant separator @", () => {
      const result = splitModelNameAndQuantization("foo@@bar@Q4_K_M");
      expect(result.modelNameWithoutQuantization).toBe("foo@bar");
      expect(result.specifiedQuantName).toBe("Q4_K_M");
    });

    it("parses multiple escaped @@ followed by quant separator @", () => {
      const result = splitModelNameAndQuantization("foo@@bar@@baz@Q8_0");
      expect(result.modelNameWithoutQuantization).toBe("foo@bar@baz");
      expect(result.specifiedQuantName).toBe("Q8_0");
    });

    it("parses name@@@quant as escaped @ then quant separator", () => {
      const result = splitModelNameAndQuantization("name@@@quant");
      expect(result.modelNameWithoutQuantization).toBe("name@");
      expect(result.specifiedQuantName).toBe("quant");
    });

    it("throws for @@ with no quant separator (e.g. name@@quant)", () => {
      expect(() => splitModelNameAndQuantization("name@@quant")).toThrow(
        "found '@@' escape sequences but no quantization separator",
      );
    });

    it("throws for only escaped @@ with no quant separator", () => {
      expect(() => splitModelNameAndQuantization("a@@b@@c")).toThrow(
        "found '@@' escape sequences but no quantization separator",
      );
    });
  });

  describe("trailing @ with empty quant", () => {
    it("throws for name@ (empty quant after separator)", () => {
      expect(() => splitModelNameAndQuantization("model@")).toThrow(
        "quantization name after '@' cannot be empty",
      );
    });

    it("throws for owner/model@ (empty quant)", () => {
      expect(() => splitModelNameAndQuantization("owner/model@")).toThrow(
        "quantization name after '@' cannot be empty",
      );
    });
  });

  describe("multiple standalone @ (ambiguous)", () => {
    it("throws for foo@bar@baz (multiple separators, no escaping)", () => {
      expect(() => splitModelNameAndQuantization("foo@bar@baz")).toThrow(
        "multiple quantization separators",
      );
    });

    it("throws for a@b@c@d (many separators)", () => {
      expect(() => splitModelNameAndQuantization("a@b@c@d")).toThrow(
        "multiple quantization separators",
      );
    });

    it("throws for @quant (leading @ implies empty model name)", () => {
      expect(() => splitModelNameAndQuantization("@quant")).toThrow();
    });
  });

  describe("quant suffix containing @", () => {
    it("throws when there are multiple standalone @ (quant part has @)", () => {
      expect(() => splitModelNameAndQuantization("model@Q4@extra")).toThrow(
        "multiple quantization separators",
      );
    });
  });

  describe("whitespace handling", () => {
    it("trims surrounding whitespace from input", () => {
      const result = splitModelNameAndQuantization("  model@Q4_K_M  ");
      expect(result.modelNameWithoutQuantization).toBe("model");
      expect(result.specifiedQuantName).toBe("Q4_K_M");
    });
  });
});
