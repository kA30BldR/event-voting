import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from './command/command.module';

@Module({
  imports: [MongooseModule.forRoot('DB_URL'), CommandModule],
})
export class AppModule {}
