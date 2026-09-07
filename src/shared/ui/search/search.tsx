import { useEffect, useState, type FC } from "react"
import Input from "../input/input"

interface SearchProps {
  delay?: number
  onSearch?: (value: string) => void
  placeholder?: string
}

const Search: FC<SearchProps> = ({
  delay = 300,
  onSearch,
  placeholder = "Поиск товаров",
}) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onSearch?.(value), delay)

    return () => window.clearTimeout(timeoutId)
  }, [delay, onSearch, value])

  return (
    <Input
      aria-label="Поиск товаров"
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      type="search"
      value={value}
    />
  )
}

export default Search
