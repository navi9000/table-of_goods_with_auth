import type { FC } from "react"
import styles from "./NotFoundPage.module.css"
import { useGoBack } from "../api/use-go-back"
import { Button } from "@/shared/ui"

const NotFoundPage: FC = () => {
  const goBack = useGoBack()
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <div>
          <h1>Страница не найдена</h1>
          <p>Запрошенный ресурс не существует или был перемещён.</p>
          <Button className={styles.button} onClick={goBack}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
