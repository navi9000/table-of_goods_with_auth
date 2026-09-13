import { useCallback, type FC } from "react"
import { Button, Search } from "@/shared/ui"
import ProductsTable from "./ProductsTable"
import styles from "./TablePage.module.css"
import { useLoaderData, useSearchParams } from "react-router"
import type { listLoader } from "../api/listLoader"
import { useAuthContext } from "@/features/auth"

const TablePage: FC = () => {
  const { data, meta } = useLoaderData<typeof listLoader>()
  const [, setSearchParams] = useSearchParams()

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
      setSearchParams(search ? { search } : {})
    },
    [setSearchParams],
  )

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
        />
      </section>
    </main>
  )
}

export default TablePage
