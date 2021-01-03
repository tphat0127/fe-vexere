import axios from "axios";

export const api = axios.create({
  //https://ntp-cybersoft-be.herokuapp.com
  baseURL: "http://localhost:5555/api"
});
export const imgServer = "https://ntp-cybersoft-be.herokuapp.com/images/"
