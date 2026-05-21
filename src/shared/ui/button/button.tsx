import type { ComponentProps, FC } from "react"
import styles from "./button.module.css"
import clsx from "clsx"

interface Props extends ComponentProps<"button"> {}

const Button: FC<Props> = ({ className, ...rest }) => {
  return <button className={clsx(styles.button, className)} {...rest} />
}

export default Button
