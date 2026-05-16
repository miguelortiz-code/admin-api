import axios from 'axios';

export const customerAxios = axios.create({
    baseURL: 'https://localhost:5000'
});