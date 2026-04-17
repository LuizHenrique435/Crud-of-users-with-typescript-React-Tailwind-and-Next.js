import axios from "axios";

export const clientAPI = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" }
});
