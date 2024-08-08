import { Schema, Document, Types } from 'mongoose';

interface Vote extends Document {
  userId: Types.ObjectId;
  dateId: Types.ObjectId;
  eventId: Types.ObjectId;
}

export const VoteSchema = new Schema<Vote>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  dateId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'EventDate',
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
});

export type VoteDocument = Vote & Document;
