const chainableMethod = () => {
  const fn: any = (...args: any[]) => chainableMethod();
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
  constructor(..._args: any[]) {}
  argParser() { return this; }
  default() { return this; }
  choices() { return this; }
  hideHelp() { return this; }
  makeOptionMandatory() { return this; }
}

export class Command<Args = any, Opts = any, GlobalOpts = any> {
  private _name = "";
  constructor(..._args: any[]) {}
  name(name?: string) {
    if (name !== undefined) {
      this._name = name;
      return this;
    }
    return this._name;
  }
  description(..._args: any[]) { return this; }
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
  opts() { return {} as any; }
  args = [];
}

export type OptionValues = Record<string, any>;
export type HelpConfiguration = any;
