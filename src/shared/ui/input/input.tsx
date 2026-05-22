import type { ComponentProps, FC, ReactNode } from "react"
import styles from "./input.module.css"
import clsx from "clsx"

interface InputProps extends ComponentProps<"input"> {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

const Input: FC<InputProps> = ({ className, leftSlot, rightSlot, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      {leftSlot && <div className={styles.leftIcon}>{leftSlot}</div>}
      <input className={clsx(styles.input, className)} {...rest} />
      {rightSlot && <div className={styles.rightAction}>{rightSlot}</div>}
    </div>
  )
}

export default Input
