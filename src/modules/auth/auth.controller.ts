import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckOtpDto, SendOtpDto } from "./dto/auth.dto";
import { LoginDto, SignupDto } from "./dto/basic.dto";

@Controller("auth")
export class AuthController{
    constructor (private readonly authService: AuthService) {}
    @Post("/send-otp")
    sendOtp(@Body() otpDto: SendOtpDto){
        return this.authService.SendOtp(otpDto);
    }
    @Post("/check-otp")
    checkOtp(@Body() otpDto: CheckOtpDto){
        return this.authService.CheckOtp(otpDto);
    }
    @Post("/sign-up")
    signUp(@Body() signupDto: SignupDto){
        return this.authService.signup(signupDto)
    }
    @Post("/login")
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}