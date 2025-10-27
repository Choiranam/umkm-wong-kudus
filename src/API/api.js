// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api-umkmwongkudus.rplrus.com/api",
  headers: {
    Accept: "application/json",
  },
});

export default api;
