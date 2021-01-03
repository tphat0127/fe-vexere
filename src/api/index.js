import axios from "axios";

export const api = axios.create({
  baseURL: "https://ntp-cybersoft-be.herokuapp.com/api"
});
export const imgServer = "https://ntp-cybersoft-be.herokuapp.com/images/"
