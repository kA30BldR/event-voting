import { Request, Response } from "express";
import axios from "axios";

const EVENT_COMMAND_SERVICE_URL = "http://localhost:4003";

const handleError = (error: unknown, res: Response) => {
  if (axios.isAxiosError(error)) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  } else {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${EVENT_COMMAND_SERVICE_URL}/events`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const voteEvent = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${EVENT_COMMAND_SERVICE_URL}/votes`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
};
