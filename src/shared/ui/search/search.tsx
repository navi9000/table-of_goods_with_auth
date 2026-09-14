import { useEffect, useRef, useState, type FC } from "react"
import Input from "../input/input"

interface SearchProps {
  delay?: number
  onSearch?: (value: string) => void
  placeholder?: string
}

const Search: FC<SearchProps> = ({
  delay = 300,
  onSearch,
  placeholder = "Найти",
}) => {
  const [value, setValue] = useState("")
  const hasInteracted = useRef(false)
  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  useEffect(() => {
    if (!hasInteracted.current) {
      return
    }

    const timeoutId = window.setTimeout(
      () => onSearchRef.current?.(value),
      delay,
    )

    return () => window.clearTimeout(timeoutId)
  }, [delay, value])

  return (
    <Input
      aria-label="Найти"
      onChange={(event) => {
        hasInteracted.current = true
        setValue(event.target.value)
      }}
      placeholder={placeholder}
      type="search"
      value={value}
      leftSlot={<img src="img/search.svg" alt="search" />}
    />
  )
}

export default Search
