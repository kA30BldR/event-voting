import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import EventDates from "./EventDates";
import EventResult from "./EventResult";

interface Date {
  _id: string;
  date: string;
}

interface Event {
  _id: string;
  name: string;
  dates: Date[];
}

interface EventModalProps {
  event: Event;
  open: boolean;
  onClose: () => void;
  onVote: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  open,
  onClose,
  onVote,
}) => {
  console.log("event ", event);
  const [showResult, setShowResult] = useState(false);

  const handleVote = async () => {
    onVote();
    setShowResult(true);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event.name}</DialogTitle>
      <DialogContent>
        {showResult ? (
          <EventResult event={event} />
        ) : (
          <EventDates event={event} onVote={handleVote} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
