import { Schema, Document, Types } from 'mongoose';

// Define the Event schema
export interface Event extends Document {
  name: string;
  dates: { _id: Types.ObjectId; date: Date }[];
  createdBy: Types.ObjectId;
}

export const EventSchema = new Schema<Event>({
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: [
      {
        date: { type: Date, required: true },
      },
    ],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export type EventDocument = Event & Document;
