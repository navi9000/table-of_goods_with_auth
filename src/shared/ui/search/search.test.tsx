import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import Search from "./search"

describe("Search", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("debounces search changes and cancels superseded values", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<Search delay={300} onSearch={onSearch} />)
    const input = screen.getByRole("searchbox")

    fireEvent.change(input, { target: { value: "phone" } })
    vi.advanceTimersByTime(299)
    expect(onSearch).not.toHaveBeenCalled()

    fireEvent.change(input, { target: { value: "phones" } })
    vi.advanceTimersByTime(300)
    expect(onSearch).toHaveBeenCalledOnce()
    expect(onSearch).toHaveBeenCalledWith("phones")
  })
})
