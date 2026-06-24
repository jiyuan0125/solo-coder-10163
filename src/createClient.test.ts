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
