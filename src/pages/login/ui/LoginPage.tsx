import { Button, Checkbox, Input, InputGroup } from "@/shared/ui"
import type { FC, SubmitEventHandler } from "react"
import styles from "./LoginPage.module.css"

const LoginPage: FC = () => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  }

  return (
    <main className={styles["login-page"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["login-logo"]} aria-hidden="true">
          GT
        </div>
        <h1>Добро пожаловать</h1>
        <p className={styles["login-subtitle"]}>Пожалуйста, авторизуйтесь</p>

        <InputGroup
          label="Электронная почта"
          input={
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          }
        />
        <InputGroup
          label="Пароль"
          input={
            <Input
              type="password"
              name="password"
              placeholder="Ваш пароль"
              required
            />
          }
        />
        <InputGroup
          input={<Checkbox name="remember" label="Запомнить данные" />}
        />

        <Button type="submit">Войти</Button>
      </form>
    </main>
  )
}

export default LoginPage
