import axios, { AxiosInstance } from 'axios';

const apiData: AxiosInstance = axios.create({
    baseURL: 'https://swapi.dev/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { apiData };