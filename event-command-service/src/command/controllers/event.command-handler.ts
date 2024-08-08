import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEventCommand } from '../commands/create-event.command';
import { CreateEventDto } from '../dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const { name, dates, createdBy } = createEventDto;
    const command = new CreateEventCommand(name, dates, createdBy);
    return this.commandBus.execute(command);
  }
}
