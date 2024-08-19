export declare enum configKeys {
    App = "App",
    Db = "Db"
}
export declare const configuration: ((() => {
    port: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
}>)[];
