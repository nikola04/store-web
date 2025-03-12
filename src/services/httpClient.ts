import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse} from "axios";

const BASE_URL = "http://localhost:3000/";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = ({ data }: AxiosResponse) => data;
const handleError = (error: AxiosError) => Promise.reject(error);

const initializeResponseInterceptor = () => {
    const authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    httpClient.interceptors.response.use(handleResponse, handleError);
    httpClient.interceptors.request.use((config) => {
        config.headers = config.headers || {} as AxiosRequestHeaders;
        config.headers['Authorization'] = authorization;
        return config;
    })
};

const createInstance = () => {
    initializeResponseInterceptor();
    return httpClient;
}

export {
    createInstance
};