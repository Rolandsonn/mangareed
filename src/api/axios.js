import axios from "axios";

const instance = axios.create({
  baseURL: "http://68.183.214.2:8666/",
});

export default instance;
