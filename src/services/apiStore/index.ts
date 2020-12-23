import http from './http'
export interface LoginReqDTO {
    loginId: string;
    password: string;
}
export interface LoginResDTO extends ReponseStatus {
    name: string
}
const ApiStore = {
    customer: {
        login: (reqDto: LoginReqDTO) => http.post<LoginResDTO>('/v1/login', reqDto),
        extention: () => http.get<any>('/v1/extention')
    }
}
export default ApiStore;