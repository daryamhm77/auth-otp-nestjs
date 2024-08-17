import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmDbCOnfig implements TypeOrmOptionsFactory{
    constructor(private configService:ConfigService) {}
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type:"postgres",
            port:this.configService.get("Db.port"),
            host:this.configService.get("Db.host"),
            username:this.configService.get("Db.username"),
            password:this.configService.get("Db.password"),
            synchronize:true
        }
    }
}