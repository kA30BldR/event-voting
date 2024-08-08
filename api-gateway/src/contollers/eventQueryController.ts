import { Request, Response } from "express";
import axios from "axios";

const EVENT_QUERY_SERVICE_URL = "http://localhost:4004";

const handleError = (error: unknown, res: Response) => {
  if (axios.isAxiosError(error)) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  } else {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const paramId = req.params.id;
    const paramPath = paramId ? `/${paramId}` : ``;
    const response = await axios.get(
      `${EVENT_QUERY_SERVICE_URL}/events${paramPath}`
    );
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getEventResults = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${EVENT_QUERY_SERVICE_URL}/events/${req.params.id}/results`
    );
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    handleError(error, res);
  }
};
