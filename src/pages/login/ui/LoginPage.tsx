import { Button, Checkbox, Input, InputGroup } from "@/shared/ui"
import { useRef, useState, type FC, type MouseEventHandler } from "react"
import styles from "./LoginPage.module.css"
import { useFetcher } from "react-router"
import type { LoginActionData } from "../model/form-data"
import { useAuthContext } from "@/features/auth"

const LoginPage: FC = () => {
  const { setToken } = useAuthContext()
  const { Form, state, data } = useFetcher<LoginActionData>()
  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password")
  const emailInputRef = useRef<HTMLInputElement>(null)

  const clearUserName: MouseEventHandler = (e) => {
    e.preventDefault()
    if (emailInputRef && emailInputRef.current) {
      emailInputRef.current.value = ""
    }
  }

  const togglePasswordInputType: MouseEventHandler = (e) => {
    e.preventDefault()
    setPasswordInputType((prev) => (prev === "password" ? "text" : "password"))
  }

  if (data?.accessToken) {
    setToken("test-token")
    // redirect("/")
  }

  return (
    <main className={styles.page}>
      <Form method="POST" className={styles.form} autoComplete="off">
        <div className={styles.logo} aria-hidden="true">
          GT
        </div>
        <h1 className={styles.heading}>Добро пожаловать</h1>
        <p className={styles.subtitle}>Пожалуйста, авторизуйтесь</p>

        <InputGroup
          label="Имя пользователя"
          input={
            <Input
              ref={emailInputRef}
              leftSlot={<img src="img/user-icon.svg" alt="user" />}
              rightSlot={
                <button onClick={clearUserName}>
                  <img src="img/close-icon.svg" alt="close" />
                </button>
              }
              name="username"
              placeholder="John Doe"
            />
          }
          errors={data?.errors.username?.errors}
        />
        <InputGroup
          label="Пароль"
          input={
            <Input
              leftSlot={<img src="img/lock-icon.svg" alt="lock" />}
              rightSlot={
                <button onClick={togglePasswordInputType}>
                  <img src="img/eye-off.svg" alt="eye" />
                </button>
              }
              type={passwordInputType}
              name="password"
              placeholder="Ваш пароль"
            />
          }
          errors={data?.errors.password?.errors}
        />
        <InputGroup
          input={<Checkbox name="remember" label="Запомнить данные" />}
        />

        <Button type="submit" disabled={state !== "idle"}>
          Войти
        </Button>
      </Form>
    </main>
  )
}

export default LoginPage
