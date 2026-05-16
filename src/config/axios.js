import axios from 'axios';

export const customerAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});