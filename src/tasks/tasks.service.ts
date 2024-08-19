import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '../modules/user/user.service';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from '../modules/user/entities/user.entity';
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(private readonly usersService: UserService,
    @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron() {
    await this.userRepository.remove()
  }
  

 

}
