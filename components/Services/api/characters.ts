import { apiData } from './api';
import axios from "axios";

interface Data {
    results: any
}


export const getApiData = async (): Promise<Data> => {
    const response = await apiData.get<Data>(`/people`);
    return response.data;
};

export const getPlanetData = async ({props}:any): Promise<Data> => {
    const response = await axios.get(`${props}`);
    return response.data;
};


export const getStarshipsData = async (): Promise<Data> => {
    const response = await apiData.get(`/starships`);
    return response.data;
};

export const getPlanetsData = async (): Promise<Data> => {
    const response = await apiData.get(`/planets`);
    return response.data;
};

export const getFilmsData = async (): Promise<Data> => {
    const response = await apiData.get(`/films`);
    return response.data;
};
