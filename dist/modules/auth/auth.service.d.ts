import { UserEntity } from '../user/entities/user.entity';
import { Repository } from "typeorm";
import { OtpEntity } from "../user/entities/otp.entity";
import { SendOtpDto } from "./dto/auth.dto";
export declare class AuthService {
    private userRepository;
    private otpRepository;
    constructor(userRepository: Repository<UserEntity>, otpRepository: Repository<OtpEntity>);
    SendOtp(otpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    createUserOtp(user: UserEntity): Promise<void>;
}
