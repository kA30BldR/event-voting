import axios from "axios";
import {
  LoginPayload,
  RegisterPayload,
} from "../components/auth/AuthInterface";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the JWT token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//auth
export const registerUser = (userPayload: RegisterPayload) =>
  api.post(`auth/register`, userPayload);
export const loginUser = (userPayload: LoginPayload) =>
  api.post(`auth/login`, userPayload);

//post
export const createUserEvent = (request: any) => api.post(`/events`, request);
export const voteForDate = (request: any) => api.post(`/votes`, request);

//get
export const getEvents = () => api.get("/events");
export const getEventResult = (eventId: string) =>
  api.get(`/events/${eventId}/results`);
