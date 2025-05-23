import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("token");
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);
