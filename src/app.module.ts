import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbCOnfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmDbCOnfig,
      inject:[TypeOrmDbCOnfig]
    }),
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
