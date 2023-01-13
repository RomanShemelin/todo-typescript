import { FC } from "react";
import styles from "./index.module.scss";
import { useToDoStore } from "../../data/stores/useTodoStore";
import InputTask from "../components/InputTask";

export const App: FC = () => {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);

  const onAdd = (title) => {
    if (title) {
      createTask(title);
    }
  };

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputTask onAdd={onAdd} />
      </section>
      <section className={styles.articleSection}></section>
    </article>
  );
};
