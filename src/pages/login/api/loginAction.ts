import loginSchema from "../model/form-data"
import { redirect } from "react-router"
import z from "zod"

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  // const remember = formData.get("remember")

  const validatedData = loginSchema.safeParse({ email, password })

  if (validatedData.error) {
    return { errors: z.treeifyError(validatedData.error).properties }
  }

  return redirect("/")
}
