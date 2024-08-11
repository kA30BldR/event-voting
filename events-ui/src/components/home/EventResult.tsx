import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import "../../styles/EventResult.scss";
import { getEventResult } from "../../services/apiService";
import { DateProps, EventProps } from "../interfaces/event.interface";

interface DateResult {
  date: DateProps;
  votes: number;
}

interface EventResultProps {
  event: EventProps;
}

const EventResult: React.FC<EventResultProps> = ({ event }) => {
  const [results, setResults] = useState<DateResult>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getEventResult(event._id);
        console.log("response.data ", response.data);
        setResults(response.data[0]);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [event]);

  return (
    <div className="event-result">
      {loading ? (
        <div className="loading">
          <CircularProgress />
          <Typography>Loading...</Typography>
        </div>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Voting Results
          </Typography>
          {results ? (
            <div className="best-date">
              <Typography variant="subtitle1" gutterBottom>
                Best Date:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={new Date(results.date.date).toLocaleDateString()}
                    secondary={`Votes: ${results.votes}`}
                  />
                </ListItem>
              </List>
            </div>
          ) : (
            <Typography>No results available</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default EventResult;
