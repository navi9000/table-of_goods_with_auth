import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import type { Product } from "@/entities/model/product"
import ProductsTable from "./ProductsTable"
import { getDisplayedProductRange } from "../model/products-table"

const product: Product = {
  id: 1,
  title: "Phone",
  brand: "Brand",
  category: "phones",
  images: [],
  rating: 4.5,
  sku: "SKU-1",
  price: 100,
  availabilityStatus: "In Stock",
}

describe("getDisplayedProductRange", () => {
  it("returns an empty range for an empty page", () => {
    expect(
      getDisplayedProductRange(0, {
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 10,
      }),
    ).toEqual({ firstItem: 0, lastItem: 0 })
  })

  it("caps the last item at the total product count", () => {
    expect(
      getDisplayedProductRange(1, {
        page: 3,
        total: 21,
        totalPage: 3,
        limit: 10,
      }),
    ).toEqual({ firstItem: 21, lastItem: 21 })
  })
})

describe("ProductsTable sorting headers", () => {
  it("sorts only the requested columns without adding icons", async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()

    render(
      <ProductsTable
        data={[product]}
        pagination={{ page: 1, total: 1, totalPage: 1, limit: 10 }}
        onPageChange={vi.fn()}
        sortBy={null}
        sortOrder={null}
        onSortChange={onSortChange}
      />,
    )

    await user.click(screen.getByRole("button", { name: "Наименование" }))
    await user.click(screen.getByRole("button", { name: "Наименование" }))
    await user.click(screen.getByRole("button", { name: "Наименование" }))

    expect(onSortChange).toHaveBeenCalledTimes(3)
    expect(onSortChange).toHaveBeenCalledWith("title")

    const skuHeader = screen.getByRole("columnheader", { name: "Артикул" })
    expect(within(skuHeader).queryByRole("button")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Вендор" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Оценка" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Цена, ₽" })).toBeInTheDocument()
  })
})

describe("ProductsTable mobile controls", () => {
  it("sorts from the mobile control and exposes card actions and selection", async () => {
    cleanup()
    const onSortChange = vi.fn()

    render(
      <ProductsTable
        data={[product]}
        pagination={{ page: 1, total: 1, totalPage: 1, limit: 10 }}
        onPageChange={vi.fn()}
        sortBy={null}
        sortOrder={null}
        onSortChange={onSortChange}
      />,
    )

    expect(screen.getAllByText("Phone").length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText("SKU-1").length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByLabelText("Выбрать 1").length).toBeGreaterThanOrEqual(
      2,
    )
    expect(
      screen.getAllByRole("button", { name: "Изменить" }).length,
    ).toBeGreaterThanOrEqual(2)
    expect(
      screen.getAllByRole("button", { name: "Удалить" }).length,
    ).toBeGreaterThanOrEqual(2)

    fireEvent.change(screen.getByLabelText("Сортировка"), {
      target: { value: "price" },
    })

    expect(onSortChange).toHaveBeenCalledWith("price")
  })
})
