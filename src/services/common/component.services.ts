import config from '../../common/config/env'
import http from '../../common/utils/net'

const apiFMCompany = 'FMCompanyApi'

import CacheInterceptor from '../../common/decorator/CacheInterceptor'
import { CacheTime } from '../../enums/enums'
import { ComponentModel } from '../../model/component'
import { nunRenderMacroString } from '../../common/nunjucks'



class Common {
  /// <summary>
  /// 获取行业名录数据
  /// </summary>
  /// <param name="companyType"></param>
  /// <param name="companyName"></param>
  /// <param name="headquarters"></param>
  /// <param name="foundedTime"></param>
  /// <param name="pageIndex"></param>
  /// <param name="pageSize"></param>
  /// <returns></returns>
  @CacheInterceptor('component_services_ComponentApiService', CacheTime.Second1)
    async ComponentApiService(params: ComponentModel) {
        let { path, name, data } = params
        return await nunRenderMacroString(path, name, data)
    }
}

let common = new Common()

export default common