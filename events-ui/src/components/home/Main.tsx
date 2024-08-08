import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import EventList from "./EventList";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "./CreateEventModal";

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => setOpen(true)}
        >
          Create Event
        </Button>
        <h2 style={{ color: "cadetblue" }}>Event Voting System</h2>
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={logoutUser}
        >
          LogOut
        </Button>
      </div>
      <EventList reset={open}/>
      {open && (
        <CreateEventModal open={!!open} onClose={() => setOpen(false)} />
      )}
    </Container>
  );
};

export default Main;
