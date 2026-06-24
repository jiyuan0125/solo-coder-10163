import path from "path";
import { defineConfig } from "vitest/config";
const stubsDir = path.resolve(__dirname, "stubs");
export default defineConfig({
    test: {
        include: ["src/**/*.test.ts"],
        exclude: ["src/subcommands/chat/react/inputReducer.test.ts"],
        globals: true,
    },
    resolve: {
        alias: {
            "@lmstudio/lms-common": path.join(stubsDir, "lms-common.ts"),
            "@lmstudio/lms-common-server": path.join(stubsDir, "lms-common-server.ts"),
            "@lmstudio/sdk": path.join(stubsDir, "sdk.ts"),
            "@lmstudio/lms-isomorphic": path.join(stubsDir, "lms-isomorphic.ts"),
            "@lmstudio/lms-shared-types": path.join(stubsDir, "lms-shared-types.ts"),
            "@lmstudio/immer-with-plugins": path.join(stubsDir, "immer.ts"),
            "@lmstudio/lms-es-plugin-runner": path.join(stubsDir, "empty.ts"),
            "@lmstudio/lms-lmstudio": path.join(stubsDir, "empty.ts"),
            "@commander-js/extra-typings": path.join(stubsDir, "commander.ts"),
            "@inquirer/prompts": path.join(stubsDir, "inquirer.ts"),
            "chalk": path.join(stubsDir, "chalk.ts"),
            "fuzzy": path.join(stubsDir, "fuzzy.ts"),
            "zod": path.join(stubsDir, "zod.ts"),
            "fast-glob": path.join(stubsDir, "fast-glob.ts"),
        },
    },
});
//# sourceMappingURL=vitest.config.js.map