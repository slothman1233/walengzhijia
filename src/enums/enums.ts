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
 * 5:询价
 */
export enum ValidateCodeDefine {
  Register = 1,
  Login = 2,
  UpdateUser = 3,
  Forgot = 4,
  enquiry = 5
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


/**
 * 产品图片类型枚举
 * 1 是外观图
 * 2 是细节图
 */
export enum productImgTypeEnums {
  external = 1,
  detaileddraw = 2
}

/**
 * 价格显示类型枚举
 * 1 显示价格
 * 2 显示数字第一位有小数点
 * 3 不显示价格
 */
export enum priceShowStatusEnums {
  showAll = 1,
  showPart = 2,
  blank = 3
}

/**
 * 新闻类型枚举
 * 0 最新新闻
 * 1 行业新闻
 * 2 经验分享
 * 3 优惠活动
 * 4 展会相关
 * 5 其他
 * 6 首页热门新闻
 */
export enum newsTypeEnums {
  new = 0,
  trade = 1,
  experience = 2,
  activity = 3,
  exhibition = 4,
  other = 5,
  hot = 6
}

/**
 * 新闻的类型object数组对象
 * 0 最新资讯
 * 1 行业新闻
 * 2 经验分享
 * 3 优惠活动
 * 4 展会相关
 * 5 其他
 */
export const NewsType = [
    {
        id: newsTypeEnums.new,
        value: '最新资讯',
    },
    {
        id: newsTypeEnums.trade,
        value: '行业新闻'
    },
    {
        id: newsTypeEnums.experience,
        value: '经验分享'
    },
    {
        id: newsTypeEnums.activity,
        value: '优惠活动'
    }, {
        id: newsTypeEnums.exhibition,
        value: '展会相关'
    }, {
        id: newsTypeEnums.other,
        value: '其他'
    }
]

/**
 * 发表新闻的类型
 * 0 最新资讯
 * 1 行业新闻
 * 2 经验分享
 * 3 优惠活动
 * 4 展会相关
 * 5 其他
 */
export enum publishNewsTypeEnums {
  new = 0,
  trade = 1,
  experience = 2,
  activity = 3,
  exhibition = 4,
  other = 5
}

export const publishNewsTypeEnumsAry = ['最新资讯', '行业新闻', '经验分享', '优惠活动', '展会相关', '其他']

/**
 * 发表新闻的类型object数组对象
 * 1 行业新闻
 * 2 经验分享
 * 3 优惠活动
 * 4 展会相关
 * 5 其他
 */
export const publishNews = [
    {
        id: publishNewsTypeEnums.trade,
        value: '行业新闻'
    },
    {
        id: publishNewsTypeEnums.experience,
        value: '经验分享'
    },
    {
        id: publishNewsTypeEnums.activity,
        value: '优惠活动'
    }, {
        id: publishNewsTypeEnums.exhibition,
        value: '展会相关'
    }, {
        id: publishNewsTypeEnums.other,
        value: '其他'
    }
]

/**
 * 广告类型
 * 1  首页顶部2  两排广告
 * 2 首页顶部1  4个广告
 * 3  轮播图广告
 */
export enum adTypeEnums {
  toptwo = 1,
  topone = 2,
  slide = 3
}

/**
 * 广告链接类型
 * 1 内部品牌商推荐
 * 2 外部链接
 */
export enum adTypeEnums {
  internal = 1,
  outer = 2
}


/**
 * 品牌商类型
 * 0 默认 不显示
 * 1 优质品牌商
 * 2 品牌商
 */
export enum HotCompanyDefine {
  Define = 0,
  QualityBrand = 1,
  Brand = 2
}

export const HotCompanyDefineItems = ['', '优质品牌商', '品牌商']

export const HotCompanyDefineObject = [
    {
        id: HotCompanyDefine.Define,
        value: HotCompanyDefineItems[HotCompanyDefine.Define]
    },
    {
        id: HotCompanyDefine.QualityBrand,
        value: HotCompanyDefineItems[HotCompanyDefine.QualityBrand]
    },
    {
        id: HotCompanyDefine.Brand,
        value: HotCompanyDefineItems[HotCompanyDefine.Brand]
    }
]


/**
 * 评分项
 * 1 性能
 * 2 配置
 * 3 外观
 * 4 质量
 * 5 售后
 * 6 能耗
 * 7 自动化 
 */
export enum scoreItemEnums {
  performance = 1,
  configuration = 2,
  appearance = 3,
  quality = 4,
  aftersale = 5,
  energyconsumption = 6,
  automation = 7
}
/**
 * 评分项object数组对象
 * 1 性能
 * 2 配置
 * 3 外观
 * 4 质量
 * 5 售后
 * 6 能耗
 * 7 自动化 
 */
export const scoreItems = [
    {
        id: scoreItemEnums.performance,
        value: '性能'
    },
    {
        id: scoreItemEnums.configuration,
        value: '配置'
    },
    {
        id: scoreItemEnums.appearance,
        value: '外观'
    }, {
        id: scoreItemEnums.quality,
        value: '质量'
    }, {
        id: scoreItemEnums.aftersale,
        value: '售后'
    }, {
        id: scoreItemEnums.energyconsumption,
        value: '能耗'
    }, {
        id: scoreItemEnums.automation,
        value: '自动化'
    }
]

/**
 * 品牌商排序枚举
 * 1 综合排序
 * 2 口碑排序
 * 3 热门排序
 */
export enum ProductSortTypeEnums {
  synthesize = 1,
  reputation = 2,
  hot = 3
}

/**
 * 品牌商排序数组object对象
 * 1 综合排序
 * 2 口碑排序
 * 3 热门排序
 */
export const ProductSortType = [
    {
        id: ProductSortTypeEnums.synthesize,
        value: '综合排序'
    },
    {
        id: ProductSortTypeEnums.reputation,
        value: '口碑排序'
    },
    {
        id: ProductSortTypeEnums.hot,
        value: '热门排序'
    }
]

/**
 * 文章内容类型
 * 1 文章
 * 2 视频
 */
export enum NewsContentTypeEnums {
  content = 1,
  video = 2
}
/**
 * 文章内容类型
 * 1 文章
 * 2 视频
 */
export const NewsContentTypeObject = [
    {
        id: NewsContentTypeEnums.content,
        value: '文章'
    },
    {
        id: NewsContentTypeEnums.video,
        value: '视频'
    }
]
/**
 * 文章内容类型
 * 0 默认  文章
 * 1 文章
 * 2 视频
 */
export const NewsContentTypeArray = ['文章', '文章', '视频']



/**
 * 点赞类型
 * 1 新闻
 * 2 口碑 包含口碑新闻
 * 3 评论
 * 4 评论回复
 */
export enum PraiseBrowsePraiseTypeEnum {
  news = 1,
  praise = 2,
  comment = 3,
  commentReply = 4
}


/**
 * 评论类型
 * 1 新闻 
 * 2 口碑 包含口碑新闻
 */
export enum CommentTargetTypeEnum {
  news = 1,
  praise = 2
}

/**
 * 性别枚举
 * 1 男
 * 2 女
 */
export enum sexEnum {
  man = 1,
  woman = 2
}

/**
 * 用户修改类型
 * 1 修改用户名
 * 2 修改头像
 * 3 修改性别
 * 4 修改行业
 * 5 修改所在地区
 */
export enum UserUpdateTypeDefine {
  Update_UserName = 1,
  Update_Icon = 2,
  Update_Sex = 3,
  Update_Industry = 4,
  Update_AreaCode = 5
}



/**
 * 公司企业修改类型属性字段枚举
 * 1 修改公司名称-简称
 * 2 修改公司名称-全称
 * 3 修改Logo
 * 4 修改公司网址信息
 * 5 修改公司电话
 * 6 修改公司地址
 * 7 修改公司介绍信息
 * 8 修改公司营业执照
 * 9 修改公司介绍视频
 */
export enum CompanyUpdateTypeDefine {
  Update_AbbrName = 1,
  Update_FullName = 2,
  Update_Logo = 3,
  Update_Website = 4,
  Update_ContactPhone = 5,
  Update_Addr = 6,
  Update_Description = 7,
  Update_Licence = 8,
  Update_Video = 9
}

/**
 * 口碑类型枚举
 * 0 全部口碑
 * 1 好
 * 2 中
 * 3 差
 */
export enum ReputationTypeEnum {
  All = 0,
  good = 1,
  middel = 2,
  short = 3
}
/**
 * 口碑类型枚举
 * 0 全部口碑
 * 1 好
 * 2 中
 * 3 差
 */
export const ReputationTypeArray = ['全部', '好评', '中评', '差评']

/**
 * 口碑类型枚举
 * 0 全部口碑
 * 1 好
 * 2 中
 * 3 差
 */
export const ReputationTypeObject = [
    {
        id: ReputationTypeEnum.All,
        value: '全部'
    },
    {
        id: ReputationTypeEnum.good,
        value: '好评'
    },
    {
        id: ReputationTypeEnum.middel,
        value: '中评'
    },
    {
        id: ReputationTypeEnum.short,
        value: '差评'
    }
]

/**
 * 查询结果类型：
 * 1 品牌商 
 * 2 新闻资讯 
 */
export enum QueryResultType {
  business = 1,
  news = 2
}

/**
 * 查询类型 
 * 1 综合 
 * 2 品牌商
 */
export enum searchqueryType {
  all = 1,
  company = 2
}

/**
 * 通知类型
 * 0 全部通知
 * 1 系统通知
 * 2 互动通知
 */
export enum NotificationTypeDefine {
  default = 0,
  System = 1,
  Interactive = 2
}
