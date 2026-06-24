const chainable = () => {
    const handler = (...args) => chainable();
    handler.optional = () => chainable();
    handler.default = () => chainable();
    handler.describe = () => chainable();
    handler.min = () => chainable();
    handler.max = () => chainable();
    handler.int = () => chainable();
    handler.boolean = () => chainable();
    handler.string = () => chainable();
    handler.number = () => chainable();
    handler.literal = () => chainable();
    handler.enum = () => chainable();
    handler.array = () => chainable();
    handler.object = () => chainable();
    handler.union = () => chainable();
    handler.record = () => chainable();
    handler.transform = () => chainable();
    handler.refine = () => chainable();
    handler.superRefine = () => chainable();
    handler.preprocess = () => chainable();
    handler.nullable = () => chainable();
    handler.parse = (v) => v;
    handler.safeParse = () => ({ success: true, data: {} });
    return handler;
};
export const z = new Proxy({}, {
    get: (_target, prop) => {
        if (prop === "object" || prop === "string" || prop === "number" || prop === "boolean" || prop === "array" || prop === "literal" || prop === "enum" || prop === "union" || prop === "record" || prop === "nullable") {
            return (...args) => chainable();
        }
        return chainable();
    },
});
//# sourceMappingURL=zod.js.map