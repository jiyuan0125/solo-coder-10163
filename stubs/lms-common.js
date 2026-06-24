export const filteredArray = () => ({ parse: (v) => v });
export const text = (strings, ...values) => String.raw({ raw: strings }, ...values);
export const makeTitledPrettyError = (title, message) => new Error(`${title}: ${message}`);
export const doesFileNameIndicateModel = (_path) => true;
export const modelExtensions = [".gguf"];
//# sourceMappingURL=lms-common.js.map