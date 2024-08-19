"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("../user/entities/otp.entity");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(userRepository, otpRepository) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
    }
    async SendOtp(otpDto) {
        const { mobile } = otpDto;
        let user = await this.userRepository.findOneBy({ mobile });
        if (!user) {
            user = this.userRepository.create({
                mobile,
            });
            await this.userRepository.save(user);
        }
        await this.createUserOtp(user);
        return {
            message: "code has sent successfully"
        };
    }
    async createUserOtp(user) {
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
        const code = (0, crypto_1.randomInt)(10000, 99999).toString();
        let otp = await this.otpRepository.findOneBy({ userId: user.id });
        if (otp) {
            if (otp.expires_in > new Date()) {
                throw new common_1.BadRequestException("code is not expired!");
            }
            otp.code = code;
            otp.expires_in = expiresIn;
        }
        else {
            otp = this.otpRepository.create({
                code,
                expires_in: expiresIn,
                userId: user.id
            });
            otp = await this.otpRepository.save(otp);
            user.otpId = otp.id;
            await this.userRepository.save(user);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(otp_entity_1.OtpEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map