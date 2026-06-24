export declare class Option {
    constructor(..._args: any[]);
    argParser(): this;
    default(): this;
    choices(): this;
    hideHelp(): this;
    makeOptionMandatory(): this;
}
export declare class Command<Args = any, Opts = any, GlobalOpts = any> {
    private _name;
    constructor(..._args: any[]);
    name(name?: string): string | this;
    description(..._args: any[]): this;
    addOption(): this;
    option(): this;
    action(): this;
    argument(): this;
    configureOutput(): this;
    addCommand(): this;
    command(): this;
    alias(): this;
    helpOption(): this;
    addHelpOption(): this;
    showHelpAfterError(): this;
    version(): this;
    hook(): this;
    parse(): this;
    parseAsync(): Promise<Awaited<this>>;
    opts(): any;
    args: never[];
}
export type OptionValues = Record<string, any>;
export type HelpConfiguration = any;
//# sourceMappingURL=commander.d.ts.map