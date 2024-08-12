import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryModule } from './query/query.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), QueryModule],
})
export class AppModule {}
