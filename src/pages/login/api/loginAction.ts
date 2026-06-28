import loginSchema from "../model/form-data"
import z from "zod"

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const username = formData.get("username")
  const password = formData.get("password")
  // const remember = formData.get("remember")

  const validatedData = loginSchema.safeParse({ username, password })

  if (validatedData.error) {
    return { errors: z.treeifyError(validatedData.error).properties }
  }

  const { accessToken } = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 15,
    }),
    credentials: "include",
  }).then((res) => res.json())

  console.log({ accessToken })

  return {
    accessToken,
  }
}
