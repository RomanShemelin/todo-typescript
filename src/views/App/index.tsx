import { FC } from "react";
import styles from "./index.module.scss";
import { useToDoStore } from "../../data/stores/useTodoStore";
import InputTask from "../components/InputTask";
import Task from "../components/Task";

export const App: FC = () => {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);

  const onAdd = (title: string) => {
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
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no tasks yet...</p>
        )}
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
