import { ConfigFactory, registerAs } from '@nestjs/config';

export enum configKeys {
    App = "App",
    Db = "Db",
    Jwt = "Jwt",
};

const AppConfig = registerAs(configKeys.App, () => ({
    port: 3000
}));

const DbConfig = registerAs(configKeys.Db, () => ({
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "doriskick",
    database: "auth-otp"
}));

const JwtConfig = registerAs(configKeys.Jwt, ()=>({
    accessToken:"87aeead61764818af461b7ad61dfd984c3e9c025",
    refreshToken:"122405bd82932fb1367500cf8d7514b275bccc32"
}))
interface MyConfig {
    AppConfig: ConfigFactory[];
    DbConfig: ConfigFactory[];
    JwtConfig: ConfigFactory[];
}

export const configuration = [AppConfig, DbConfig, JwtConfig];
