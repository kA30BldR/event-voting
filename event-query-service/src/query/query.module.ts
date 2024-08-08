import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './models/event.model';
import { QueryController } from './controllers/query.controller';
import { EventQueryHandler } from './handlers/event.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetEventResultsHandler } from './handlers/get-event-results.handler';
import { VoteSchema } from './models/vote.model';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
  ],
  controllers: [QueryController],
  providers: [EventQueryHandler, GetEventResultsHandler],
})
export class QueryModule {}
