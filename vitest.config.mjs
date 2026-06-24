import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    exclude: [
      "src/subcommands/chat/react/inputReducer.test.ts",
      "dist/**",
    ],
  },
});
