import { Button, Checkbox, Input, InputGroup } from "@/shared/ui"
import type { FC, SubmitEventHandler } from "react"
import styles from "./LoginPage.module.css"
import { useFetcher } from "react-router"
import type { LoginActionData } from "../model/form-data"

const LoginPage: FC = () => {
  const { Form, state, data } = useFetcher<LoginActionData>()

  console.log({ data })

  return (
    <main className={styles.page}>
      <Form method="POST" className={styles.form} autoComplete="off">
        <div className={styles.logo} aria-hidden="true">
          GT
        </div>
        <h1 className={styles.heading}>Добро пожаловать</h1>
        <p className={styles.subtitle}>Пожалуйста, авторизуйтесь</p>

        <InputGroup
          label="Электронная почта"
          input={<Input name="email" placeholder="you@example.com" />}
          errors={data?.errors.email?.errors}
        />
        <InputGroup
          label="Пароль"
          input={
            <Input type="password" name="password" placeholder="Ваш пароль" />
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
