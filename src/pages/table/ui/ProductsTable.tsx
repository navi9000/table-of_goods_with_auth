import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import type { FC } from "react"
import { Button, Checkbox, InputGroup } from "@/shared/ui"
import styles from "./ProductsTable.module.css"
import type { Product } from "@/entities/model/product"
import type { ProductSortField } from "@/entities/model/product"
import clsx from "clsx"
import {
  getDisplayedProductRange,
  type ProductsPagination,
} from "../model/products-table"
import ArrowsIcon from "./ArrowsIcon"

interface ProductsTableProps {
  data: Product[]
  pagination: ProductsPagination
  onPageChange: (page: number) => void
  sortBy: ProductSortField | null
  sortOrder: "asc" | "desc" | null
  onSortChange: (sortBy: ProductSortField) => void
}

const sortableColumns = new Set<ProductSortField>([
  "title",
  "brand",
  "rating",
  "price",
])

const features = tableFeatures({ rowSelectionFeature })
const columnHelper = createColumnHelper<typeof features, Product>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <InputGroup
        input={
          <Checkbox
            aria-label="Выбрать все товары"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        }
      />
    ),
    cell: ({ row }) => (
      <InputGroup
        input={
          <Checkbox
            aria-label={`Выбрать ${row.original.id}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        }
      />
    ),
  }),
  columnHelper.accessor("title", {
    header: "Наименование",
  }),
  columnHelper.accessor("brand", {
    header: "Вендор",
  }),
  columnHelper.accessor("sku", {
    header: "Артикул",
  }),
  columnHelper.accessor("rating", {
    header: "Оценка",
    cell: ({ getValue }) => (
      <span>
        <span className={clsx({ [styles.danger]: getValue() < 3.5 })}>
          {getValue().toFixed(1)}
        </span>
        /5
      </span>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Цена, ₽",
  }),
])

const ProductsTable: FC<ProductsTableProps> = ({
  data,
  pagination,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const { firstItem, lastItem } = getDisplayedProductRange(
    data.length,
    pagination,
  )

  const table = useTable({
    data,
    columns,
    enableRowSelection: true,
    features,
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.maintop}>
        <h2 className={styles.tabletitle}>Все позиции</h2>
        <div className={styles.maintopbuttons}>
          <Button
            variant="outline"
            icon={<ArrowsIcon />}
            onClick={() => table.resetRowSelection()}
          />
        </div>
      </div>
      <div className={styles.tablelist}>
        <div className={styles.mobileSort}>
          <label htmlFor="mobile-sort">Сортировка</label>
          <select
            id="mobile-sort"
            value={sortBy ?? ""}
            onChange={(event) => {
              if (event.target.value) {
                onSortChange(event.target.value as ProductSortField)
              }
            }}
          >
            <option value="">Без сортировки</option>
            <option value="title">Наименование</option>
            <option value="brand">Вендор</option>
            <option value="rating">Оценка</option>
            <option value="price">Цена</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={
                      sortBy === header.id && sortOrder
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : sortableColumns.has(
                        header.id as ProductSortField,
                      ) ? (
                      <button
                        type="button"
                        className={styles.sortableHeader}
                        onClick={() =>
                          onSortChange(header.id as ProductSortField)
                        }
                      >
                        {table.FlexRender({ header })}
                      </button>
                    ) : (
                      table.FlexRender({ header })
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>{table.FlexRender({ cell })}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.mobileCards}>
          {table.getRowModel().rows.map((row) => (
            <article className={styles.productCard} key={row.id}>
              <div className={styles.productCardHeader}>
                <InputGroup
                  input={
                    <Checkbox
                      aria-label={`Выбрать ${row.original.id}`}
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  }
                />
                <h3>{row.original.title}</h3>
              </div>
              <dl className={styles.productDetails}>
                <div>
                  <dt>Вендор</dt>
                  <dd>{row.original.brand}</dd>
                </div>
                <div>
                  <dt>Артикул</dt>
                  <dd>{row.original.sku}</dd>
                </div>
                <div>
                  <dt>Оценка</dt>
                  <dd>
                    <span
                      className={clsx({
                        [styles.danger]: row.original.rating < 3.5,
                      })}
                    >
                      {row.original.rating.toFixed(1)}
                    </span>
                    /5
                  </dd>
                </div>
                <div>
                  <dt>Цена</dt>
                  <dd>{row.original.price} ₽</dd>
                </div>
              </dl>
              <div className={styles.actions}></div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <span>
          Показано <span className={styles.darker}>{firstItem}</span>-
          <span className={styles.darker}>{lastItem}</span> из{" "}
          <span className={styles.darker}>{pagination.total}</span>
        </span>
        <div className={styles.pagination}>
          <Button
            variant="outline"
            size="small"
            type="button"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(1)}
          >
            {`<<`}
          </Button>
          <Button
            variant="outline"
            size="small"
            type="button"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            {`<`}
          </Button>
          <span>{pagination.page}</span>
          <Button
            variant="outline"
            size="small"
            type="button"
            disabled={pagination.page === pagination.totalPage}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            {`>`}
          </Button>
          <Button
            variant="outline"
            size="small"
            type="button"
            disabled={pagination.page === pagination.totalPage}
            onClick={() => onPageChange(pagination.totalPage)}
          >
            {`>>`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductsTable
