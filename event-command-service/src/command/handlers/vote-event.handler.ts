import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVoteEventCommand } from '../commands/vote-event.command';
import { VoteDocument } from '../models/vote.model';

@CommandHandler(CreateVoteEventCommand)
export class VoteEventHandler
  implements ICommandHandler<CreateVoteEventCommand>
{
  constructor(@InjectModel('Vote') private voteModel: Model<VoteDocument>) {}

  async execute(command: CreateVoteEventCommand): Promise<VoteDocument> {
    const { userId, dateId, eventId } = command;
    const vote = new this.voteModel({ userId, dateId, eventId });
    return vote.save();
  }
}
