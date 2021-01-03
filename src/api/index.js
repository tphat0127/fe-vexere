import axios from "axios";

export const api = axios.create({
  //https://ntp-cybersoft-be.herokuapp.com
  baseURL: "https://ntp-cybersoft-be.herokuapp.com/api"
});
export const imgServer = "https://ntp-cybersoft-be.herokuapp.com/images/"
