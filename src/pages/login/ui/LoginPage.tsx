import type { FC, FormEvent } from "react"

const LoginPage: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo" aria-hidden="true">
          GT
        </div>
        <h1>Добро пожаловать</h1>
        <p className="login-subtitle">Пожалуйста, авторизуйтесь</p>

        <label>
          <span>Электронная почта</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            placeholder="Ваш пароль"
            required
          />
        </label>

        <label className="login-checkbox">
          <input type="checkbox" name="remember" />
          <span>Запомнить данные</span>
        </label>

        <button type="submit">Войти</button>
      </form>
    </main>
  )
}

export default LoginPage
