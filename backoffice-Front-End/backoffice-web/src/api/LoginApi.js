import axios from "axios";

export const LoginApi = axios.create({
  baseURL: "http://localhost:8080",
});
