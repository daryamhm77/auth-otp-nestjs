import { BadRequestException, ConflictException, Injectable, UnauthorizedException, Module } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from "typeorm";
import { OtpEntity } from "../user/entities/otp.entity";
import { CheckOtpDto, SendOtpDto } from "./dto/auth.dto";
import { randomInt } from "crypto";
import {JwtService} from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from './types/payload';
import { LoginDto, SignupDto } from './dto/basic.dto';
import {hashSync, genSaltSync, compareSync} from "bcrypt"


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
        private jwtService: JwtService,
        private configService: ConfigService,
      ) {}
    async SendOtp(otpDto: SendOtpDto){
        const {mobile} = otpDto;
        let user = await this.userRepository.findOneBy({mobile});
        if(!user){
            user = this.userRepository.create({
                mobile,
            });
            await this.userRepository.save(user)
            
        }
        await this.createUserOtp(user);
        return{
            message:"code has sent successfully"
        }
    }
    async findUnverifiedUsers(){
        return this.userRepository.findOne({})
    }
    async CheckOtp(otpDto: CheckOtpDto){
        const{mobile, code} = otpDto;
        const now = new Date();
        let user = await this.userRepository.findOne({
            where:{mobile},
            relations:{
                otp:true
            }
        });
        if(!user || !user?.otp) throw new UnauthorizedException("user is not found");
        const otp = user?.otp;
        if(otp?.code !== code) throw new UnauthorizedException("Otp code is not true");
        if(otp.expires_in < now ) throw new UnauthorizedException("code is been expired");

        if(!user.verify_mobile){
            await this.userRepository.update(
                {id:user.id},
                {verify_mobile: true}
            )
        }
       const {accessToken, refreshToken} = this.createTokenForUser({id: user.id, mobile});
       return{
        accessToken,
        refreshToken,
        message:"log in successfully"
       }
    }
    async signup(signupDto: SignupDto){
        const {first_name, last_name,email, password, confirm_password, mobile} = signupDto;
        await this.checkMobile(mobile);
        await this.checkEmail(email);
        if(password !== confirm_password) throw new BadRequestException("pass is not match");
        const salt = genSaltSync(10);
        const hashedPass = hashSync(password, salt);
        const user = this.userRepository.create({
            first_name,
            last_name,
            mobile,
            email,
            password:hashedPass,
            verify_mobile:false

        });
        await this.userRepository.save(user);
        return{
            message:'signed up is ok'
        }
    }
    async login(loginDto: LoginDto){
        const{email,password} = loginDto;
        const user = await this.userRepository.findOneBy({email});
        if(!user) throw new UnauthorizedException("user not found");
        if(!compareSync(password, user.password)){
            throw new UnauthorizedException("email or password is incorrect");
        };
        const {accessToken ,refreshToken} = this.createTokenForUser({mobile: user.mobile, id: user.id});
        return{
            accessToken,
            refreshToken,
            message:{"you logged in"}
        }
    }
    async checkMobile(mobile: string){
        const user = await this.userRepository.findOneBy({mobile});
        if(user) throw new ConflictException("mobile is already exist");
    }
    async checkEmail(email: string){
        const user = await this.userRepository.findOneBy({email});
        if(user) throw new ConflictException("mobile is already exist");
    }
    async createUserOtp(user: UserEntity){
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
        const code = randomInt(10000, 99999).toString();
        let otp = await this.otpRepository.findOneBy({userId: user.id});
        if(otp){
            if(otp.expires_in > new Date()){
                throw new BadRequestException("code is not expired!")
            }
            otp.code = code;
            otp.expires_in = expiresIn;
        }else{
            otp = this.otpRepository.create({
                code,
                expires_in:expiresIn,
                userId: user.id
            })
            otp = await this.otpRepository.save(otp)
            user.otpId = otp.id;
            await this.userRepository.save(user)
        }
    }
    createTokenForUser(payload: TokenPayload){
        const accessToken = this.jwtService.sign(
            payload,
            {
                secret:this.configService.get("Jwt.accessToken"),
                expiresIn:"30d"
            }
        );
        const refreshToken = this.jwtService.sign(
            payload,
            {
                secret: this.configService.get("Jwt.refreshToken"),
                expiresIn:"1y",
            }
        )
    }
    async validateAccessToken(token: string){
        try {
            const payload = this.jwtService.verify<TokenPayload>(token,{
                secret: this.configService.get("Jwt.accessToken")
            });
            if(typeof payload === "object" && payload?.id){
                const user = await this.userRepository.findOneBy({id: payload.id});
                if(!user) throw new UnauthorizedException("Login on your Account");
                return user;
            }
        } catch (error) {
            throw new UnauthorizedException("Login on your Account")
        }
    }
}