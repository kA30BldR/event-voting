import { Dayjs } from "dayjs";

interface UserProps {
  name: string;
}

interface DatePayload {
  date: Dayjs;
}

export interface EventProps {
  _id: string;
  name: string;
  user?: UserProps;
  dates: DateProps[];
}

export interface DateProps {
  _id: string;
  date: string;
}

export interface EventDatesProps {
  event: EventProps;
  open?: boolean;
  onClose?: () => void;
  onVote: () => void;
}

export interface EventDatesPayload {
  name: string;
  dates: DatePayload[];
  createdBy: string | null;
}

export interface VoteSubmitPayload {
  dateId: string;
  eventId: string;
  userId: string | null;
}
