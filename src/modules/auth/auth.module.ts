import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OtpEntity } from "../user/entities/otp.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity, OtpEntity])],
    controllers:[AuthController],
    providers:[AuthService, JwtService],
    exports:[AuthService, JwtService, TypeOrmModule]
})
export class AuthModule{}