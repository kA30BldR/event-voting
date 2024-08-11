import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import SimpleDatePicker from "./SimpleDatePicker";
import { Dayjs } from "dayjs";
import { AxiosError, AxiosResponse } from "axios";
import { createUserEvent } from "../../services/apiService";
import { EventDatesPayload } from "../interfaces/event.interface";

interface CreateEventlProps {
  open: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventlProps> = ({ open, onClose }) => {
  const [event, setEvent] = useState("");
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);

  const createEvent = async () => {
    const request: EventDatesPayload = {
      name: event,
      dates: selectedDates.map((d) => ({ date: d })),
      createdBy: localStorage.getItem("userId"),
    };
    await createUserEvent(request)
      .then((res: AxiosResponse) => {
        onClose();
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            label="Event"
            variant="outlined"
            margin="normal"
            value={event}
            placeholder="Enter your Event"
            onChange={(e) => setEvent(e.target.value)}
          />
          <SimpleDatePicker
            dateList={selectedDates}
            pickDateList={setSelectedDates}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={createEvent}
          color="primary"
          disabled={!event || selectedDates.length === 0}
        >
          Create
        </Button>
        <Button onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;
