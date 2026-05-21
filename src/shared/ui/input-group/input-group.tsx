import type { FC, ReactNode } from "react"
import styles from "./input-group.module.css"

interface Props {
  input: ReactNode
  label?: string
  errors?: string[]
}

const InputGroup: FC<Props> = ({ input, label, errors }) => {
  return (
    <label>
      {label && <span>{label}</span>}
      {input}
      {!!errors?.length && <span className={styles.error}>{errors[0]}</span>}
    </label>
  )
}

export default InputGroup
