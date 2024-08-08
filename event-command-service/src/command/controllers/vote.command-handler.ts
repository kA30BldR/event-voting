import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateVoteEventCommand } from '../commands/vote-event.command';
import { CreateVoteDto } from '../dto/create-vote.dto';

@Controller('votes')
export class VoteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createVote(@Body() createVoteDto: CreateVoteDto) {
    const { userId, dateId, eventId } = createVoteDto;
    const command = new CreateVoteEventCommand(userId, dateId, eventId);
    return this.commandBus.execute(command);
  }
}
