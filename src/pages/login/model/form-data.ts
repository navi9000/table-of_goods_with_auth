import z from "zod"

const loginSchema = z.object({
  email: z.email("Введите валидный email").trim(),
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
}

export default loginSchema
