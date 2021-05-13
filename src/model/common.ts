import { ResCompanyInfoModel } from './company/resCompany'
import { LepackUserModel } from './user/User'




/**
 * cookie中的用户模型
 */
export interface userLoginModel extends LepackUserModel {
  company:ResCompanyInfoModel
}

