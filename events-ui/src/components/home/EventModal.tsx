import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EventDates from "./EventDates";
import EventResult from "./EventResult";
import { EventDatesProps } from "../interfaces/event.interface";

const EventModal: React.FC<EventDatesProps> = ({
  event,
  open,
  onClose,
  onVote,
}) => {
  const [showResult, setShowResult] = useState(false);

  const handleVote = async () => {
    onVote();
    setShowResult(true);
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="sm" fullWidth>
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
