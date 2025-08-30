import { useState, type FormEvent } from 'react';
import { type TaskCreateInput } from '../../types';
import { Button } from '../ui/Button';

export interface TaskFromProps {
  addTask: (task: TaskCreateInput) => void;
  toggleSection: () => void;
  open: boolean;
}

function TaskForm({ addTask, toggleSection, open }: TaskFromProps) {
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
    <div className="task-container">
      <h1>Task List Priority</h1>

      <Button
        className={`close-button ${open ? 'open' : ''}`}
        onClick={toggleSection}
      >
        +
      </Button>

      {open && (
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
          <Button type={'submit'}>Add Task</Button>
        </form>
      )}
    </div>
  );
}

export default TaskForm;
