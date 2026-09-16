import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import Button from "./button"

describe("Button", () => {
  afterEach(() => {
    cleanup()
  })

  it("uses the default medium button when variant and size are omitted", () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })

    expect(button.className).toContain("button_default")
  })

  it("renders a right-side icon for the default variant", () => {
    render(
      <Button icon={<span data-testid="save-icon" aria-hidden="true" />}>
        Save
      </Button>,
    )

    expect(screen.getByRole("button", { name: "Save" })).toContainElement(
      screen.getByTestId("save-icon"),
    )
    expect(screen.getByTestId("save-icon").parentElement?.className).toContain(
      "button_iconContent",
    )
  })

  it("renders an icon-only button without exposing custom props on the DOM", () => {
    render(
      <Button
        type="button"
        variant="icon"
        icon={<span data-testid="close-icon" aria-hidden="true" />}
      />,
    )

    const button = screen.getByRole("button")

    expect(button.className).toContain("button_icon")
    expect(button).not.toHaveAttribute("variant")
    expect(button).not.toHaveAttribute("icon")
    expect(button).toContainElement(screen.getByTestId("close-icon"))
  })

  it("supports small outline buttons and selected state", () => {
    render(
      <Button variant="outline" size="small" selected>
        2
      </Button>,
    )

    const button = screen.getByRole("button", { name: "2" })

    expect(button.className).toContain("button_outline")
    expect(button.className).toContain("button_small")
    expect(button.className).toContain("button_selected")
    expect(button).toHaveAttribute("aria-pressed", "true")
  })

  it("marks disabled buttons and forwards native props", () => {
    render(
      <Button variant="outline" disabled aria-label="Next page">
        Next
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Next page" })

    expect(button).toBeDisabled()
    expect(button.className).toContain("button_disabled")
  })
})
