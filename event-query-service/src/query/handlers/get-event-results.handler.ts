import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetResultByEventQuery } from '../queries/get-result-by-event.query';
import { VoteDocument } from '../models/vote.model';
import { EventDocument } from '../models/event.model';

@Injectable()
@QueryHandler(GetResultByEventQuery)
export class GetEventResultsHandler
  implements IQueryHandler<GetResultByEventQuery>
{
  constructor(
    @InjectModel('Vote') private readonly voteModel: Model<VoteDocument>,
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {}

  async execute(query: GetResultByEventQuery): Promise<any> {
    const { eventId } = query;

    // Fetch the event to get the dates
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new Error('Event not found');
    }

    // Initialize the results
    const results = event.dates.map((date) => ({
      date,
      votes: 0,
    }));

    // Fetch all votes for the event
    const votes = await this.voteModel.find({ eventId }).exec();

    // Count the votes for each date
    votes.forEach((vote) => {
      const dateIndex = event.dates.findIndex((date) =>
        date._id.equals(vote.dateId),
      );
      if (dateIndex !== -1) {
        results[dateIndex].votes += 1;
      }
    });

    // Find the maximum vote count
    const maxVotes = Math.max(...results.map((result) => result.votes));

    // Filter results to return only those with the maximum vote count
    const highestVotedDates = results.filter(
      (result) => result.votes === maxVotes,
    );

    return highestVotedDates;
  }
}
