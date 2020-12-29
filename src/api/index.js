import axios from "axios";

export const api = axios.create({
  baseURL: "https://ntp-cybersoft-be.herokuapp.com"
});
