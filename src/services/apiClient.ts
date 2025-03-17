import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse} from "axios";
import { ACCESS_TOKEN } from "../constants/storage";

const BASE_URL = "http://localhost:3000/";

interface ServerResponse {
    status?: "OK";
    message?: string; // Opciono polje
}

const isSuccessfull = (status: number): boolean => {
    return (status >= 200 && status < 300) || status == 304;
}

const handleResponse = <T extends ServerResponse>(response: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>> => {
    const { data, status } = response;
    if (isSuccessfull(status) && data?.status === 'OK') {
        return response;
    }
    const message = (data && data.message) ? data.message : 'Error making request, please check your internet connection.';
    return Promise.reject({ ...response, data: { error: true, message } });
}
const handleError = (error: AxiosError) => Promise.reject(error);

const initializeResponseInterceptor = (apiClient: AxiosInstance) => {
    const authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    apiClient.interceptors.response.use(handleResponse, handleError);
    apiClient.interceptors.request.use((config) => {
        config.headers = config.headers || {} as AxiosRequestHeaders;
        config.headers['Authorization'] = authorization;
        return config;
    })
};

export const createAPIClient = () => {
    const apiClient = axios.create({
        baseURL: BASE_URL,
        headers: {
          "Content-Type": "application/json",
        },
    });
    initializeResponseInterceptor(apiClient);
    return apiClient;
}
