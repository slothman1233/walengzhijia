

import http from './http'



/**
 * 获取当前时间
 * @return {number} 时间戳
 */
export const currenttime = async () => await http.get(`/api/currenttime`).catch(data => data)



