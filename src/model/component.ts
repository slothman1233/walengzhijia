
/**
 * 获取macro模板字符串
 * @param {string} path 相对于macro的路径
 * @param {string} name 方法名
 * @param {Object} data 参数
 * @return {string} html字符串
 */
export interface ComponentModel {
  //相对于macro的路径
  path: string 
  //方法名称
  name: string 
  //参数
  data?: any 
}