"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = exports.configKeys = void 0;
const config_1 = require("@nestjs/config");
var configKeys;
(function (configKeys) {
    configKeys["App"] = "App";
    configKeys["Db"] = "Db";
})(configKeys || (exports.configKeys = configKeys = {}));
;
const AppConfig = (0, config_1.registerAs)(configKeys.App, () => ({
    port: 3000
}));
const DbConfig = (0, config_1.registerAs)(configKeys.Db, () => ({
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "doriskick",
    database: "auth-otp"
}));
exports.configuration = [AppConfig, DbConfig];
//# sourceMappingURL=config.js.map