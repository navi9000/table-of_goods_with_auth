import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import type { FC } from "react"
import { Checkbox, InputGroup } from "@/shared/ui"
import styles from "./ProductsTable.module.css"
import type { Product } from "@/entities/model/product"
import clsx from "clsx"
import {
  getDisplayedProductRange,
  type ProductsPagination,
} from "../model/products-table"

interface ProductsTableProps {
  data: Product[]
  pagination: ProductsPagination
  onPageChange: (page: number) => void
}

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
  columnHelper.display({
    id: "actions",
    header: () => null,
    cell: () => (
      <div className={styles.actions}>
        <button type="button">Изменить</button>
        <button type="button">Удалить</button>
      </div>
    ),
  }),
])

const ProductsTable: FC<ProductsTableProps> = ({
  data,
  pagination,
  onPageChange,
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
          <button onClick={() => table.resetRowSelection()}>Сбросить</button>
          <button>Добавить</button>
        </div>
      </div>
      <div className={styles.tablelist}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col">
                    {header.isPlaceholder ? null : table.FlexRender({ header })}
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
      </div>
      <div className={styles.footer}>
        <span>
          Показано {firstItem}-{lastItem} из {pagination.total}
        </span>
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(1)}
          >
            {`<<`}
          </button>
          <button
            type="button"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            {`<`}
          </button>
          <span>{pagination.page}</span>
          <button
            type="button"
            disabled={pagination.page === pagination.totalPage}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            {`>`}
          </button>
          <button
            type="button"
            disabled={pagination.page === pagination.totalPage}
            onClick={() => onPageChange(pagination.totalPage)}
          >
            {`>>`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsTable
