import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as authController from "./contollers/authController";
import * as eventCommandController from "./contollers/eventCommandController";
import * as eventQueryController from "./contollers/eventQueryController";
import { verifyToken } from "./middleware/authMiddleware";
import { ENV } from "./config/env";

const app = express();
const PORT = ENV.PORT;
app.use(cors());
app.use(bodyParser.json());

// Auth Routes
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

// Event Command Routes
app.post("/events", verifyToken, eventCommandController.createEvent);
app.post("/votes", verifyToken, eventCommandController.voteEvent);

// Event Query Routes
app.get(["/events", "/events/:id"], verifyToken, eventQueryController.getEvent);
app.get(
  "/events/:id/results",
  verifyToken,
  eventQueryController.getEventResults
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
