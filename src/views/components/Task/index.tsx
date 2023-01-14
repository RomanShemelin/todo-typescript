import { FC, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface TaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, value: string) => void;
  onRemoved: (id: string) => void;
}

const Task: FC<TaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.Task}>
      <label className={styles.TaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          className={styles.TaskCheckBox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 200);
            }
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            ref={editTitleRef}
            onChange={(e) => setValue(e.target.value)}
            className={styles.TaskEditTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
          />
        ) : (
          <h3 className={styles.TaskTittle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="edit"
          className={styles.TaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="save"
          className={styles.TaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        aria-label="remove"
        className={styles.TaskRemove}
        onClick={() => {
          if (confirm("Are you shure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};

export default Task;
