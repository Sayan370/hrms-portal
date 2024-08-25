import axios, {
    AxiosInterceptorOptions,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

import { config } from "@/utils/app-config";

const baseURL = config.env.API_BASE_URL;

const instance = axios.create({ baseURL });

function injectAuthToken(jwt: string) {
    instance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

function removeAuthToken() {
    delete instance.defaults.headers.common.Authorization;
}

function insertResponseInterceptor(
    onFulfilled?:
        | ((
              value: AxiosResponse<any>
          ) => AxiosResponse<any> | Promise<AxiosResponse<any>>)
        | undefined,
    onRejected?: ((error: any) => any) | undefined,
    options?: AxiosInterceptorOptions
) {
    instance.interceptors.response.use(onFulfilled, onRejected, options);
}

function insertRequestInterceptor(
    onFulfilled?:
        | ((
              value: InternalAxiosRequestConfig<any>
          ) =>
              | InternalAxiosRequestConfig<any>
              | Promise<InternalAxiosRequestConfig<any>>)
        | undefined,
    onRejected?: ((error: any) => any) | undefined,
    options?: AxiosInterceptorOptions
) {
    instance.interceptors.request.use(onFulfilled, onRejected, options);
}

export default {
    get: instance.get,
    post: instance.post,
    delete: instance.delete,
    put: instance.put,
    injectAuthToken,
    removeAuthToken,
    insertResponseInterceptor,
    insertRequestInterceptor,
};
