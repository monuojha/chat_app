import axios from 'axios';
import store from "../store";
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const navigate = useNavigate();
        if (error.response.status === 401) {
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
