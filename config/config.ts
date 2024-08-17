import {ConfigFactory, registerAs} from '@nestjs/config'

export enum configKeys{
    App = "App",
    Db = "Db"
};
const AppConfig = registerAs(configKeys.App, ()=>({
    port:3000
}));
const DbConfig = registerAs(configKeys.Db, ()=>({
    port:5432,
    host:"localhost",
    username:"postgres",
    password:"doriskick",
    database:"auth-otp"
}))
interface MyConfig {
    AppConfig: ConfigFactory[];
    DbConfig: ConfigFactory[];
    // Other properties...
  }
  
export const configuration = {AppConfig, DbConfig};