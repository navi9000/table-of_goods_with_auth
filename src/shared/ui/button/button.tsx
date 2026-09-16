import type { ComponentProps, FC, ReactNode } from "react"
import styles from "./button.module.css"
import clsx from "clsx"

type NativeButtonProps = Omit<
  ComponentProps<"button">,
  "aria-pressed" | "children" | "size"
>

interface DefaultButtonProps extends NativeButtonProps {
  variant?: "default"
  size?: "medium" | "small"
  icon?: ReactNode
  selected?: never
  children?: ReactNode
}

interface IconButtonProps extends NativeButtonProps {
  variant: "icon"
  size?: never
  icon: ReactNode
  selected?: never
  children?: never
}

interface OutlineButtonProps extends NativeButtonProps {
  variant: "outline"
  size?: "medium" | "small"
  icon?: ReactNode
  selected?: boolean
  children?: ReactNode
}

type Props = DefaultButtonProps | IconButtonProps | OutlineButtonProps

const Button: FC<Props> = ({
  className,
  disabled,
  variant = "default",
  size = "medium",
  icon,
  selected,
  children,
  ...nativeProps
}) => {
  const content =
    variant === "icon" ? (
      icon
    ) : (
      <>
        {icon != null && (
          <span className={styles.button_iconContent}>{icon}</span>
        )}
        {children}
      </>
    )

  return (
    <button
      className={clsx(
        styles.button,
        styles[`button_${variant}`],
        {
          [styles.button_small]: variant !== "icon" && size === "small",
          [styles.button_selected]: variant === "outline" && selected,
          [styles.button_disabled]: disabled,
        },
        className,
      )}
      {...nativeProps}
      disabled={disabled}
      aria-pressed={variant === "outline" ? selected : undefined}
    >
      {content}
    </button>
  )
}

export default Button
