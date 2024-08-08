import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetEventQuery } from '../queries/get-event.query';
import { GetResultByEventQuery } from '../queries/get-result-by-event.query';

@Controller('events')
export class QueryController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getEvents() {
    const query = new GetEventQuery();
    return this.queryBus.execute(query);
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    const query = new GetEventQuery(id);
    return this.queryBus.execute(query);
  }

  @Get(':eventId/results')
  async getEventResults(@Param('eventId') eventId: string) {
    return this.queryBus.execute(new GetResultByEventQuery(eventId));
  }
}
