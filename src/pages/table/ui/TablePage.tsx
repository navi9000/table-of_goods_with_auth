import type { FC } from "react"
import { Search } from "@/shared/ui"
import { products } from "../model/products"
import ProductsTable from "./ProductsTable"
import styles from "./TablePage.module.css"

const TablePage: FC = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Товары</h1>
        <div className={styles.search}>
          <Search />
        </div>
      </header>
      <section>
        <ProductsTable data={products} />
      </section>
    </main>
  )
}

export default TablePage
