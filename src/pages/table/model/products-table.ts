export interface ProductsPagination {
  page: number
  total: number
  totalPage: number
  limit: number
}

export const getDisplayedProductRange = (
  dataLength: number,
  pagination: ProductsPagination,
) => ({
  firstItem:
    dataLength === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1,
  lastItem: Math.min(pagination.page * pagination.limit, pagination.total),
})
