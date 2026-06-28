import z from "zod"

const loginSchema = z.object({
  username: z.string("Введите логин").trim(),
  password: z
    .string("Введите пароль")
    .min(6, "Пароль должен быть не короче 6 символов")
    .trim(),
})

type LoginActionErrors = Partial<
  Record<keyof z.infer<typeof loginSchema>, { errors: string[] }>
>

export type LoginActionData = {
  errors: LoginActionErrors
  // success?: true
  accessToken?: string
}

export default loginSchema
