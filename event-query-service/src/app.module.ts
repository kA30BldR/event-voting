import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'DB_URL',
    ),
    QueryModule,
  ],
})
export class AppModule {}
