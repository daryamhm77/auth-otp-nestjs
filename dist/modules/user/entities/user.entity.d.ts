import { OtpEntity } from "./otp.entity";
export declare class UserEntity {
    id: number;
    firstName: string;
    lastname: string;
    mobile: string;
    verify_mobile: boolean;
    created_at: Date;
    updated_at: Date;
    otpId: number;
    otp: OtpEntity;
}
