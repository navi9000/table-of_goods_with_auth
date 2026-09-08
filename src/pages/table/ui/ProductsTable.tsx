import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import type { FC } from "react"
import { Button, Checkbox, InputGroup } from "@/shared/ui"
import type { Product } from "../model/products"
import styles from "./ProductsTable.module.css"

interface ProductsTableProps {
  data: Product[]
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
            aria-label={`Выбрать ${row.original.name}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        }
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Наименование",
  }),
  columnHelper.accessor("vendor", {
    header: "Вендор",
  }),
  columnHelper.accessor("article", {
    header: "Артикул",
  }),
  columnHelper.accessor("rating", {
    header: "Оценка",
    cell: ({ getValue }) => `${getValue().toFixed(1)}`,
  }),
  columnHelper.accessor("price", {
    header: "Цена",
    cell: ({ getValue }) => `${getValue().toLocaleString("ru-RU")} ₽`,
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

const ProductsTable: FC<ProductsTableProps> = ({ data }) => {
  const table = useTable({
    data,
    columns,
    enableRowSelection: true,
    features,
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.maintop}>
        <h2>Все товары</h2>
        <div className={styles.maintopbuttons}>
          <Button onClick={() => table.resetRowSelection()}>Сбросить</Button>
          <Button>Добавить</Button>
        </div>
      </div>
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
  )
}

export default ProductsTable
