
import env from "../../config/env"
import http from '../http'
interface LoginInfoModel {
  username: string
  password: string
}

export const login = (info: LoginInfoModel) =>
  http.post({
    url:'/login/loginByAccount'
  })
