import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { ACCESS_TOKEN, CSRF_TOKEN } from "../constants/storage";

const BASE_URL = "http://localhost:3000/";

const isSuccessfull = (status: number): boolean => {
    return (status >= 200 && status < 300) || status == 304;
}

const handleResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
    const { data, status } = response;

    if (isSuccessfull(status) && data?.status === 'OK') {
        return response;
    }

    const message = (data && data.message) ? data.message : 'Error making request, please check your internet connection.';
    return Promise.reject({ ...response, data: { error: true, message } });
}
const handleError = async (error: AxiosError) => {
    if (!error.response || !error.response.data || typeof (error.response.data as { message?: string }).message !== 'string') {
        return Promise.reject(error);
    }
    const { data, status } = error.response as { data: { message?: string }; status: number };
    if (status === 401 && data.message === 'Expired authorization token') {
        await refreshToken();

        const originalRequestConfig = error.response.config;
        setConfigHeaders(originalRequestConfig);
        originalRequestConfig.url = setCsrfParam(originalRequestConfig.url || '');
        return axios(originalRequestConfig);
    }
    return Promise.reject(error);
}

const initializeResponseInterceptor = (apiClient: AxiosInstance) => {
    apiClient.interceptors.response.use(handleResponse, handleError);
    apiClient.interceptors.request.use((config) => setConfigHeaders(config));
};

const setConfigHeaders = (config: InternalAxiosRequestConfig) => {
    const authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    config.headers = config.headers || {} as AxiosRequestHeaders;
    config.headers['Authorization'] = authorization;
    config.withCredentials = true;
    return config;
}

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

const setCsrfParam = (url: string) => {
    const [base, params] = url.split('?');
    const searchParams = new URLSearchParams(params);;

    const csrf = localStorage.getItem(CSRF_TOKEN) || '';
    searchParams.set('csrf', csrf);
    return base + '?' + searchParams.toString();
}

const createRequest = ({ url, method }: {
    url: string;
    method: string;
}) => {
    const apiClient = createAPIClient();
    url = setCsrfParam(url);
    return () => apiClient.request({
        url,
        method
    });
}

const refreshToken = async () => {
    const apiClient = createAPIClient();
    const refreshResponse = await apiClient.request({ url: '/auth/refresh', method: 'POST' });
    if(isSuccessfull(refreshResponse.status) && refreshResponse.data.status == 'OK' && refreshResponse.data.access_token && refreshResponse.data.csrf_token){
        const accessToken = refreshResponse.data.access_token;
        const csrfToken = refreshResponse.data.csrf_token;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(CSRF_TOKEN, csrfToken);
    }
}

export const makeRequest = async ({ url, method = 'GET' }: {
    url: string,
    method: string,
    authorize: boolean
}) => {
    const request = createRequest({ url, method });
    return await request();
}
