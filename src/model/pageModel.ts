
/**
 * 分页模型  pageTypeModel<T>
 * @param {number} pageIndex 当前页码
 * @param {number} totalRecords 总记录数
 * @param {number} totalPages 总页数
 * @param {number} pageSize 每页记录数
 * @param {string} extraInfo 附加信息
 * @param {boolean} hasPreviousPage 是否有上一页
 * @param {boolean} hasNextPage 是否有下一页
 * @param {T[]} items 数据
 */
type pageTypeModel<T> = {
  pageIndex?: number,
  totalRecords?: number,
  totalPages?: number,
  pageSize?: number,
  extraInfo?: string,
  hasPreviousPage?: boolean,
  hasNextPage?: boolean,
  items?: T[]
}

//分页模型
class PageModel<T> {
  pageIndex: number
  totalRecords: number
  totalPages: number
  pageSize: number
  extraInfo: string
  hasPreviousPage: boolean
  hasNextPage: boolean
  items: T[]
  constructor({ pageIndex, totalRecords, totalPages, items, hasPreviousPage, hasNextPage, extraInfo, pageSize = 10 }: pageTypeModel<T>) {
      this.pageIndex = pageIndex
      this.totalRecords = totalRecords
      this.totalPages = totalPages < 0 ? totalPages : parseInt((totalRecords / pageSize).toString())
      this.items = items
      this.extraInfo = extraInfo
      this.hasPreviousPage = hasPreviousPage
      this.hasNextPage = hasNextPage
  }
}


export {
    PageModel,
    pageTypeModel
}