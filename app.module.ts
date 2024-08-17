import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbCOnfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmDbCOnfig,
      inject:[TypeOrmDbCOnfig]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
