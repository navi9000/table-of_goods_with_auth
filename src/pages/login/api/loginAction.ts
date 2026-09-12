import loginSchema from "../model/form-data"
import z from "zod"

export interface LoginFormData {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
  remember: boolean
}

export const parseLoginForm = (formData: FormData): LoginFormData => ({
  username: formData.get("username"),
  password: formData.get("password"),
  remember: formData.get("remember") === "on",
})

interface LoginResponse {
  accessToken?: string
  refreshToken?: string
  message?: string
}

export const loginRequest = async (
  credentials: LoginFormData,
  fetchImpl: typeof fetch = fetch,
): Promise<LoginResponse> => {
  const response = await fetchImpl("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 15,
    }),
    credentials: "include",
  })

  return (await response.json()) as LoginResponse
}

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const credentials = parseLoginForm(formData)

  const validatedData = loginSchema.safeParse({
    username: credentials.username,
    password: credentials.password,
  })

  if (validatedData.error) {
    return { errors: z.treeifyError(validatedData.error).properties }
  }
  try {
    const { accessToken, refreshToken, message } =
      await loginRequest(credentials)

    if (message) {
      return {
        errors: {
          username: {
            errors: [message],
          },
          password: {
            errors: [message],
          },
        },
      }
    }

    return {
      accessToken,
      refreshToken,
      remember: credentials.remember,
    }
  } catch {
    return {
      errors: {
        username: {
          errors: ["Неизвестная ошибка"],
        },
        password: {
          errors: ["Неизвестная ошибка"],
        },
      },
    }
  }
}
