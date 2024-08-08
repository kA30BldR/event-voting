import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import Main from "./components/home/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
