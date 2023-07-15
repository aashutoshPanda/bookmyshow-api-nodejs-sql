import dotenv from "dotenv";
dotenv.config({ path: ".env.example" });

export const axiosConfig = {
  maxBodyLength: Infinity,
  url: `http://localhost:${process.env.ELASTIC_SEARCH_PORT}/shows/_search`,
  headers: {
    "Content-Type": "application/json",
  },
};
