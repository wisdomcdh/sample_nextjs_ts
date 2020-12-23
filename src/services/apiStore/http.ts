import AppAlert from '@Services/appAlert';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface ExtAxiosRequestConfig extends AxiosRequestConfig {
    errorHandle?: string[]
}
export interface ApiResponse<T> extends Promise<AxiosResponse<StandardResponseDTO<T>>> {
}
class ApiError extends Error {
    code: string;
    detail: StandardResponseDTO<any>
    constructor() {
        super();
        this.code = '';
        this.detail = {
            code: '',
            detail: null
        };
    }
    getAppAlertInfo(): AppAlertInfo {
        return {
            title: this.code,
            content: this.message
        }
    }
}
class XhrError extends Error {
    code: string;
    constructor() {
        super();
        this.code = '';
    }
    getAppAlertInfo(): AppAlertInfo {
        return {
            title: 'Unknown Error',
            content: this.message + '[' + this.code + ']'
        }
    }
}
const interceptReq = (config: ExtAxiosRequestConfig) => {
    return config;
}
const interceptRes = (response: AxiosResponse) => {
    const data = response.data as StandardResponseDTO<any>;
    if (response.data.code !== "200") {
        const e = new ApiError();
        e.name = e.code = data.code;
        e.message = data.message!;
        e.detail = data.detail;
        const config = response.config as ExtAxiosRequestConfig;
        if (!config.errorHandle || config.errorHandle.indexOf(e.code) == -1) {
            AppAlert.error(e.getAppAlertInfo());
        }
        throw e;
    }
    return response;
}
const interceptReject = (error: any) => {
    if (error) {
        const e = new XhrError();
        if (error.response) {
            const { status, statusText } = error.response;
            e.code = status;
            e.message = statusText;
        } else {
            e.message = error;
        }
        AppAlert.error(e.getAppAlertInfo());
        throw e;
    }
}
const _axios = axios.create({
    baseURL: process.env.extend.API_BASE_URL || '/',
    timeout: process.env.extend.API_TIMEOUT || 30000
});
_axios.interceptors.request.use(interceptReq);
_axios.interceptors.response.use(interceptRes, interceptReject);

type GenericRequird = "제네릭 유형은 필수 이며, extends ReponseStatus 유형이어야 합니다."
const http = {
    get<T = void>(url: string & (T extends ReponseStatus ? string : GenericRequird), config?: ExtAxiosRequestConfig): ApiResponse<T> {
        return _axios.get(url, config);
    },
    post<T = void>(url: string & (T extends ReponseStatus ? string : GenericRequird), data: any, config?: ExtAxiosRequestConfig): ApiResponse<T> {
        return _axios.post(url, data, config);
    },
    put<T = void>(url: string & (T extends ReponseStatus ? string : GenericRequird), data: any, config?: ExtAxiosRequestConfig) {
        return _axios.put(url, data, config);
    },
    patch<T>(url: string & (T extends ReponseStatus ? string : GenericRequird), data: any, config?: ExtAxiosRequestConfig) {
        return _axios.patch(url, data, config);
    },
    delete<T>(url: string & (T extends ReponseStatus ? string : GenericRequird), config?: ExtAxiosRequestConfig) {
        return _axios.delete(url, config);
    }
}
export default http;