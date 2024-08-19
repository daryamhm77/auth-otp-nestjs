import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id:number;
    @Column({nullable:true})
    firstName:string;
    @Column({nullable:true})
    lastname:string;
    @Column({nullable:true})
    email:string;
    @Column({nullable:true})
    password:string;
    @Column({nullable:true})
    @Column({nullable:true})
    confirm_password:string;
    mobile:string;
    @Column({default:false})
    verify_mobile:boolean;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;
    @Column({nullable:true})
    otpId:number;
    @OneToOne(()=> OtpEntity, otp=> otp.user)
    @JoinColumn({name:"otpId"})
    otp: OtpEntity
}

