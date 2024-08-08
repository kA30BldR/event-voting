import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import EventModal from "./EventModal";
import "../../styles/EventList.scss";
import { getEvents } from "../../services/apiService";

interface ResetProps {
  reset: boolean;
}
interface User {
  name: string;
}

interface Date {
  _id: string;
  date: string;
}

interface Event {
  _id: string;
  name: string;
  user?: User;
  dates: Date[];
}

const EventList: React.FC<ResetProps> = ({ reset }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState<"vote" | "result" | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    if (!reset) {
      fetchEvents();
    }
  }, [reset]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (type: "vote" | "result") => {
    setShowModal(type);
  };

  const handleCloseModal = () => {
    setShowModal(null);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    handleOpenModal("vote");
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div className="event-list">
      {loading ? (
        <div className="loading">
          <CircularProgress />
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <>
          <TextField
            variant="outlined"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-field"
          />
          <List>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <ListItem
                  button
                  key={event._id}
                  onClick={() => handleSelectEvent(event)}
                  className="event-item"
                >
                  <ListItemText
                    primary={event.name}
                    secondary={`Creator: ${event.user?.name}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No events found" />
              </ListItem>
            )}
          </List>

          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              open={!!showModal}
              onClose={handleCloseModal}
              onVote={() => handleOpenModal("result")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EventList;
