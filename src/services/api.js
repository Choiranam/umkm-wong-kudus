import axios from "axios";

const BASE_URL = "https://api-umkmwongkudus.rplrus.com/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
        } else {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export const auth = {
    setToken: (token) => {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    getToken: () => localStorage.getItem("token"),

    clearToken: () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
    },
};

export default api;
