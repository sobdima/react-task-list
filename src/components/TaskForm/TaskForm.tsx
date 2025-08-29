import { useState, type FormEvent } from 'react';
import { type TaskCreateInput } from '../../App';

export interface TaskFromProps {
  addTask: (task: TaskCreateInput) => void;
}

function TaskForm({ addTask }: TaskFromProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle('');
      setPriority('Low');
      setDeadline('');
    }
  }

  return (
    <>
      <form action="" className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="task title"
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="datetime-local"
          value={deadline}
          required
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}

export default TaskForm;
