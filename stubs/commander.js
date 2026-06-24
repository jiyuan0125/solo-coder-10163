const chainableMethod = () => {
    const fn = (...args) => chainableMethod();
    fn.argParser = () => fn;
    fn.default = () => fn;
    fn.choices = () => fn;
    fn.hideHelp = () => fn;
    fn.required = () => fn;
    fn.optional = () => fn;
    fn.presets = () => fn;
    fn.env = () => fn;
    fn.conflicts = () => fn;
    fn.implies = () => fn;
    return fn;
};
export class Option {
    constructor(..._args) { }
    argParser() { return this; }
    default() { return this; }
    choices() { return this; }
    hideHelp() { return this; }
    makeOptionMandatory() { return this; }
}
export class Command {
    constructor(..._args) {
        this._name = "";
        this.args = [];
    }
    name(name) {
        if (name !== undefined) {
            this._name = name;
            return this;
        }
        return this._name;
    }
    description(..._args) { return this; }
    addOption() { return this; }
    option() { return this; }
    action() { return this; }
    argument() { return this; }
    configureOutput() { return this; }
    addCommand() { return this; }
    command() { return this; }
    alias() { return this; }
    helpOption() { return this; }
    addHelpOption() { return this; }
    showHelpAfterError() { return this; }
    version() { return this; }
    hook() { return this; }
    parse() { return this; }
    parseAsync() { return Promise.resolve(this); }
    opts() { return {}; }
}
//# sourceMappingURL=commander.js.map