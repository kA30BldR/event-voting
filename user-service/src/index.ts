import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";

const app: Application = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

mongoose
  .connect("DB_URL")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB", error.message);
    } else {
      console.error("Unknown error connecting to MongoDB");
    }
  });

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
