/// <summary>
/// Cn新闻类别
/// </summary>
export enum FmNewsCategoryType {
  首页 = 0,
  零售交易 = 1,
  券商活动 = 2,
  人物专访 = 3,
  机构交易 = 4,
  数据报告 = 5,
  监管要闻 = 6,
  基础知识 = 7,
  技术策略 = 8,
  金融案鉴 = 9,
  行业资讯 = 100,
  交易干货 = 101,
  活动采访 = 102
}


export enum CacheTime {
  None = 0,
  Month1 = 2592000,
  Week1 = 604800,
  Day2 = 172800,
  Day1 = 86400,
  Hour6 = 21600,
  Hour5 = 18000,
  Hour4 = 14400,
  Hour3 = 10800,
  Hour2 = 7200,
  Hour1 = 3600,
  Year1 = 31536000,
  Min30 = 1800,
  Min15 = 900,
  Min10 = 600,
  Min5 = 300,
  Min4 = 240,
  Min3 = 180,
  Min2 = 120,
  Min1 = 60,
  Second30 = 30,
  Second10 = 10,
  Second5 = 5,
  Second3 = 3,
  Second1 = 1
}


/**
 * 验证码枚举
 * 1:注册
 * 2:登录
 * 3:修改用户信息
 * 4:忘记密码
 */
export enum ValidateCodeDefine {
  Register = 1,
  Login = 2,
  UpdateUser = 3,
  Forgot = 4
}

/**
 * 登录方式枚举
 * 1:手机登录
 * 2:账号密码登录
 */
export enum LoginEnums {
  Phone = 1,
  AccountPwd = 2
}

/**
 * subCode类型
 * success 成功
 * error 失败
 * fail 业务失败
 */
export enum subCodeEnums {
  success = 'Success',
  error = 'Error',
  fail = 'Fail'
}