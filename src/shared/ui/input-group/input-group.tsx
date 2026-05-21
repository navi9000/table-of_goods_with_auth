import type { FC, ReactNode } from "react"

interface Props {
  input: ReactNode
  label?: string
}

const InputGroup: FC<Props> = ({ input, label }) => {
  return (
    <label>
      {label && <span>{label}</span>}
      {input}
    </label>
  )
}

export default InputGroup
