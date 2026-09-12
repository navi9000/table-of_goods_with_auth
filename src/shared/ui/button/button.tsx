import type { ComponentProps, FC } from "react"
import styles from "./button.module.css"
import clsx from "clsx"

interface Props extends ComponentProps<"button"> {
  _dummyProp?: undefined
}

const Button: FC<Props> = ({ className, disabled, ...rest }) => {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles.button_disabled]: disabled },
        className,
      )}
      {...rest}
    />
  )
}

export default Button
