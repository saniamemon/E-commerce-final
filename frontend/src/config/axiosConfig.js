import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-final-7ocn.onrender.com/api",
});

export default axiosInstance;