import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    return config;
  }
);

export default axiosInstance;