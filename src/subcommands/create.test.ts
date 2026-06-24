import { extractTarballNameFromNpmPackOutput } from "./create.js";

describe("extractTarballNameFromNpmPackOutput", () => {
  it("extracts tarball name from stdout only", () => {
    expect(
      extractTarballNameFromNpmPackOutput("lmstudio-scaffold-typescript-1.0.0.tgz\n", ""),
    ).toBe("lmstudio-scaffold-typescript-1.0.0.tgz");
  });

  it("extracts tarball name from stderr when stdout is empty", () => {
    expect(
      extractTarballNameFromNpmPackOutput("", "some warning\nlmstudio-scaffold-ts-1.0.0.tgz\n"),
    ).toBe("lmstudio-scaffold-ts-1.0.0.tgz");
  });

  it("extracts tarball name when it is embedded in stderr multi-line output", () => {
    const result = extractTarballNameFromNpmPackOutput(
      "",
      "npm warn ... some warning\nlmstudio-scaffold-python-2.0.0.tgz\n",
    );
    expect(result).toBe("lmstudio-scaffold-python-2.0.0.tgz");
  });

  it("picks first .tgz token from stdout when output does not end with .tgz", () => {
    expect(
      extractTarballNameFromNpmPackOutput("lmstudio-scaffold-rust-1.0.0.tgz extra junk", ""),
    ).toBe("lmstudio-scaffold-rust-1.0.0.tgz");
  });

  it("picks first .tgz token from stderr when stdout has no .tgz", () => {
    expect(
      extractTarballNameFromNpmPackOutput("some info", "lmstudio-scaffold-go-1.0.0.tgz more info"),
    ).toBe("lmstudio-scaffold-go-1.0.0.tgz");
  });

  it("prefers stdout over stderr when both contain .tgz tokens", () => {
    const result = extractTarballNameFromNpmPackOutput(
      "stdout-scaffold-1.0.0.tgz",
      "stderr-scaffold-1.0.0.tgz",
    );
    expect(result).toBe("stdout-scaffold-1.0.0.tgz");
  });

  it("throws when neither stdout nor stderr contains a .tgz name", () => {
    expect(() => extractTarballNameFromNpmPackOutput("no tarball here", "also no tarball")).toThrow(
      "npm pack did not produce a recognizable tarball name",
    );
  });

  it("throws when both stdout and stderr are empty", () => {
    expect(() => extractTarballNameFromNpmPackOutput("", "")).toThrow(
      "npm pack did not produce a recognizable tarball name",
    );
  });

  it("handles tarball name with leading/trailing whitespace in stdout", () => {
    expect(
      extractTarballNameFromNpmPackOutput("  lmstudio-scaffold-cpp-1.0.0.tgz  ", ""),
    ).toBe("lmstudio-scaffold-cpp-1.0.0.tgz");
  });
});
