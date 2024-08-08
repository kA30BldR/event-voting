import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument } from '../models/event.model';
import { GetEventQuery } from '../queries/get-event.query';
import { Model } from 'mongoose';

interface QueryType extends IQuery {
  id?: string;
}

@Injectable()
@QueryHandler(GetEventQuery)
export class EventQueryHandler implements IQueryHandler<QueryType> {
  constructor(
    @InjectModel('Event')
    private readonly eventModel: Model<EventDocument>,
  ) {}

  async execute(query: QueryType): Promise<EventDocument[] | EventDocument> {
    const { id } = query;
    if (id) {
      const event = await this.eventModel.findById(id).exec();
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } else {
      return this.eventModel
        .aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $project: {
              name: 1,
              dates: 1,
              'user.name': 1,
            },
          },
        ])
        .exec();
    }
  }
}
