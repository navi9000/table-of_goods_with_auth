import type { ComponentProps, FC } from "react"
import styles from "./checkbox.module.css"
import clsx from "clsx"

interface Props extends Omit<ComponentProps<"input">, "type"> {
  label?: string
}

const Checkbox: FC<Props> = ({ label, className, ...rest }) => {
  return (
    <div className={styles.container}>
      <input
        className={clsx(styles.checkbox, className)}
        type="checkbox"
        {...rest}
      />
      <span className={styles.box} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}

export default Checkbox
