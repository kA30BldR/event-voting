import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import "../../styles/EventDates.scss";
import { voteForDate } from "../../services/apiService";

interface Date {
  _id: string;
  date: string;
}

interface Event {
  _id: string;
  name: string;
  dates: Date[];
}

interface EventDatesProps {
  event: Event;
  onVote: () => void;
}

const EventDates: React.FC<EventDatesProps> = ({ event, onVote }) => {
  const [dates, setDates] = useState<Date[]>(event.dates);

  const handleVote = async (dateId: string) => {
    const request = {
      dateId,
      eventId: event._id,
      userId: localStorage.getItem("userId"),
    };
    try {
      await voteForDate(request);
      onVote();
    } catch (err) {
      console.error("Failed to vote", err);
    }
  };

  return (
    <div className="event-dates">
      <Typography variant="h6" gutterBottom>
        Select a date to vote
      </Typography>
      <List>
        {dates.map((date) => (
          <ListItem key={date._id}>
            <ListItemText primary={new Date(date.date).toLocaleDateString()} />
            <Button
              onClick={() => handleVote(date._id)}
              color="primary"
              variant="contained"
            >
              Vote
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EventDates;
