const chalk = new Proxy({}, {
  get: (_target, prop) => {
    if (typeof prop === "symbol") return () => "";
    const fn = (str: string) => String(str);
    return new Proxy(fn, {
      get: () => fn,
      apply: (_target, _thisArg, args) => String(args.join("")),
    });
  },
});

export default chalk;
