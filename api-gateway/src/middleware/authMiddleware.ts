import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ENV } from "../config/env";

const AUTH_SERVICE_URL = ENV.USER_SERVICE_URL;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    await axios.post(
      `${AUTH_SERVICE_URL}/auth/verify`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    next();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status || 500)
        .json(
          error.response?.data || { message: "Failed to authenticate token" }
        );
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
