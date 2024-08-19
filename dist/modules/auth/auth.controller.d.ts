import { AuthService } from "./auth.service";
import { SendOtpDto } from "./dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
}
