import type { ComponentProps, FC } from "react"
import styles from "./input.module.css"
import clsx from "clsx"

interface InputProps extends ComponentProps<"input"> {}

const Input: FC<InputProps> = ({ className, ...rest }) => {
  return <input className={clsx(styles.input, className)} {...rest} />
}

export default Input
