import { Request, Response } from 'express';
import axios from 'axios';
import { ENV } from '../config/env';

export const register = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${ENV.USER_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${ENV.USER_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};
