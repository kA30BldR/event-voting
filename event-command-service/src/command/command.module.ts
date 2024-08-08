import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateEventHandler } from './handlers/create-event.handler';
import { VoteEventHandler } from './handlers/vote-event.handler';
import { EventSchema } from './models/event.model';
import { VoteSchema } from './models/vote.model';
import { EventController } from './controllers/event.command-handler';
import { VoteController } from './controllers/vote.command-handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'Vote', schema: VoteSchema },
    ]),
  ],
  controllers: [EventController, VoteController],
  providers: [CreateEventHandler, VoteEventHandler],
})
export class CommandModule {}
