import { UserEntity } from './user.entity';
export declare class OtpEntity {
    id: number;
    code: string;
    expires_in: Date;
    userId: number;
    user: UserEntity;
}
