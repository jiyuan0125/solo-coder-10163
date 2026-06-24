export const filteredArray = () => ({ parse: (v: any) => v });
export const text = (strings: TemplateStringsArray, ...values: any[]) =>
  String.raw({ raw: strings }, ...values);
export interface SimpleLogger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}
export const makeTitledPrettyError = (title: string, message: string) => new Error(`${title}: ${message}`);
export const doesFileNameIndicateModel = (_path: string) => true;
export const modelExtensions = [".gguf"];
