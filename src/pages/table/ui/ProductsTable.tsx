import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table"
import { useState, type FC } from "react"
import { Checkbox } from "@/shared/ui"
import type { Product } from "../model/products"
import styles from "./ProductsTable.module.css"

interface ProductsTableProps {
  data: Product[]
}

const columnHelper = createColumnHelper<Product>()

const ProductsTable: FC<ProductsTableProps> = ({ data }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns: [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Выбрать все товары"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label={`Выбрать ${row.original.name}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
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
    ],
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
