import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import Search from "./search"

describe("Search", () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it("does not search on initial render", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()

    render(<Search delay={300} onSearch={onSearch} />)
    vi.advanceTimersByTime(300)

    expect(onSearch).not.toHaveBeenCalled()
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

  it("searches when the user clears the input", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<Search delay={300} onSearch={onSearch} />)
    const input = screen.getByRole("searchbox")

    fireEvent.change(input, { target: { value: "phone" } })
    vi.advanceTimersByTime(300)
    fireEvent.change(input, { target: { value: "" } })
    vi.advanceTimersByTime(300)

    expect(onSearch).toHaveBeenLastCalledWith("")
  })

  it("does not search again when the callback changes", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    const nextOnSearch = vi.fn()
    const { rerender } = render(<Search delay={300} onSearch={onSearch} />)
    const input = screen.getByRole("searchbox")

    fireEvent.change(input, { target: { value: "phone" } })
    vi.advanceTimersByTime(300)
    rerender(<Search delay={300} onSearch={nextOnSearch} />)
    vi.advanceTimersByTime(300)

    expect(onSearch).toHaveBeenCalledOnce()
    expect(nextOnSearch).not.toHaveBeenCalled()
  })
})
