import { describe, expect, it, vi } from "vitest";

vi.mock("@commander-js/extra-typings", () => ({
  Option: class {},
  Command: class {},
}));

vi.mock("@lmstudio/lms-common", () => ({
  text: (strings: TemplateStringsArray, ...values: any[]) =>
    String.raw({ raw: strings }, ...values),
  SimpleLogger: class {},
}));

vi.mock("@lmstudio/lms-common-server", () => ({
  findOrStartLlmster: vi.fn(),
  findLMStudioHome: vi.fn(() => "/tmp/.lmstudio"),
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

vi.mock("../exists.js", () => ({
  exists: vi.fn(),
}));

vi.mock("../lmstudioPaths.js", () => ({
  lmsKey2Path: "/tmp/.lmstudio/lms-key-2",
  cliPrefPath: "/tmp/.lmstudio/cli-pref.json",
}));

vi.mock("../logLevel.js", () => ({}));

vi.mock("../types/refinedNumber.js", () => ({
  createRefinedNumberParser: vi.fn(),
}));

import { isLocalHost } from "./createClient.js";

describe("isLocalHost", () => {
  it("returns true for 127.0.0.1", () => {
    expect(isLocalHost("127.0.0.1")).toBe(true);
  });

  it("returns true for 127.0.0.2", () => {
    expect(isLocalHost("127.0.0.2")).toBe(true);
  });

  it("returns true for 127.0.0.100", () => {
    expect(isLocalHost("127.0.0.100")).toBe(true);
  });

  it("returns true for 127.255.255.255", () => {
    expect(isLocalHost("127.255.255.255")).toBe(true);
  });

  it("returns true for 127.1.1.1", () => {
    expect(isLocalHost("127.1.1.1")).toBe(true);
  });

  it("returns true for localhost", () => {
    expect(isLocalHost("localhost")).toBe(true);
  });

  it("returns true for LOCALHOST (case insensitive)", () => {
    expect(isLocalHost("LOCALHOST")).toBe(true);
  });

  it("returns true for ::1", () => {
    expect(isLocalHost("::1")).toBe(true);
  });

  it("returns true for [::1]", () => {
    expect(isLocalHost("[::1]")).toBe(true);
  });

  it("returns true for 0.0.0.0", () => {
    expect(isLocalHost("0.0.0.0")).toBe(true);
  });

  it("returns true for host with surrounding whitespace", () => {
    expect(isLocalHost("  127.0.0.1  ")).toBe(true);
  });

  it("returns false for 10.0.0.1", () => {
    expect(isLocalHost("10.0.0.1")).toBe(false);
  });

  it("returns false for 192.168.1.1", () => {
    expect(isLocalHost("192.168.1.1")).toBe(false);
  });

  it("returns false for 128.0.0.1", () => {
    expect(isLocalHost("128.0.0.1")).toBe(false);
  });

  it("returns false for a random hostname", () => {
    expect(isLocalHost("my-server.example.com")).toBe(false);
  });

  it("returns false for 172.17.0.1", () => {
    expect(isLocalHost("172.17.0.1")).toBe(false);
  });
});
