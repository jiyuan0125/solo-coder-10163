export declare const filteredArray: () => {
    parse: (v: any) => any;
};
export declare const text: (strings: TemplateStringsArray, ...values: any[]) => string;
export interface SimpleLogger {
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}
export declare const makeTitledPrettyError: (title: string, message: string) => Error;
export declare const doesFileNameIndicateModel: (_path: string) => boolean;
export declare const modelExtensions: string[];
//# sourceMappingURL=lms-common.d.ts.map