import type { FC } from "react"
import { Search } from "@/shared/ui"
import ProductsTable from "./ProductsTable"
import styles from "./TablePage.module.css"
import { useLoaderData, useSearchParams } from "react-router"
import type { listLoader } from "../api/listLoader"

const TablePage: FC = () => {
  const { data, meta } = useLoaderData<typeof listLoader>()
  const [, setSearchParams] = useSearchParams()

  const changePage = (page: number) => {
    setSearchParams({ page: String(page) })
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Товары</h1>
        <div className={styles.search}>
          <Search />
        </div>
      </header>
      <section>
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
