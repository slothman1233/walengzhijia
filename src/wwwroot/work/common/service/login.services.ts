

import http from './http'

import env from '../config/env'

/**
 * 登录
 */
export const Login = async (name: string, value: string): Promise<any> => await http.post<any>(`/login`, { name, value })
