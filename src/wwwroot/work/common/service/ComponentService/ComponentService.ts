
import { ComponentModel } from '../../../../../model/component'
import env from '../../config/env'
import http from '../http'



/**
 * 获取macro模板字符串
 * @param {ComponentModel} params 
 * @return {string} html
 */
export const getcomponent = async (params: ComponentModel) => await http.post(`/api/component`, params, {codes: { sures: ['0'] }} ).catch(data => data)



