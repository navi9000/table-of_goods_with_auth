import type { FC } from "react"
import { Button, Search } from "@/shared/ui"
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
        <div className={styles.maintop}>
          <h2>Все товары</h2>
          <div className={styles.maintopbuttons}>
            <Button></Button>
            <Button>Добавить</Button>
          </div>
        </div>
        <ProductsTable data={products} />
      </section>
    </main>
  )
}

export default TablePage
