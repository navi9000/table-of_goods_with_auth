import { useCallback, type FC } from "react"
import { Button, Search } from "@/shared/ui"
import ProductsTable from "./ProductsTable"
import styles from "./TablePage.module.css"
import { useLoaderData, useSearchParams } from "react-router"
import type { listLoader } from "../api/listLoader"
import { useAuthContext } from "@/features/auth"
import type { ProductSortField } from "@/entities"

const TablePage: FC = () => {
  const { data, meta } = useLoaderData<typeof listLoader>()
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sortBy") as ProductSortField | null
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | null

  const { logout } = useAuthContext()

  const changePage = (pageAsNum: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      params.set("page", String(pageAsNum))
      return params
    })
  }

  const searchForItems = useCallback(
    (search: string | undefined) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        if (search) {
          params.set("search", search)
        } else {
          params.delete("search")
        }
        params.delete("page")
        return params
      })
    },
    [setSearchParams],
  )

  const changeSort = (nextSortBy: ProductSortField) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      const isCurrentColumn = params.get("sortBy") === nextSortBy
      const currentOrder = params.get("sortOrder")

      if (!isCurrentColumn || currentOrder === null) {
        params.set("sortBy", nextSortBy)
        params.set("sortOrder", "asc")
      } else if (currentOrder === "asc") {
        params.set("sortOrder", "desc")
      } else {
        params.delete("sortBy")
        params.delete("sortOrder")
      }
      params.delete("page")
      return params
    })
  }

  const onQuit = () => {
    logout()
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Товары</h1>
        <div className={styles.search}>
          <Search onSearch={searchForItems} />
        </div>
        <div>
          <Button onClick={onQuit}>Выйти</Button>
        </div>
      </header>
      <section className={styles.content}>
        <ProductsTable
          data={data}
          pagination={meta.pagination}
          onPageChange={changePage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={changeSort}
        />
      </section>
    </main>
  )
}

export default TablePage
