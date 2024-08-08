import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventCommand } from '../commands/create-event.command';
import { EventDocument } from '../models/event.model';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(@InjectModel('Event') private eventModel: Model<EventDocument>) {}

  async execute(command: CreateEventCommand): Promise<EventDocument> {
    const { name, dates, createdBy } = command;
    const event = new this.eventModel({ name, dates, createdBy });
    return event.save();
  }
}
