import axios from "axios";

export const api = axios.create({
    baseURL: "https://vexere-ntp.herokuapp.com/api"
});