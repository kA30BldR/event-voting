import * as dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  COMMAND_SERVICE_URL: process.env.COMMAND_SERVICE_URL,
  QUERY_SERVICE_URL: process.env.QUERY_SERVICE_URL,
};
