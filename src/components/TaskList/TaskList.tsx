import { type Task } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';
import { Button } from '../ui/Button';

type TaskListProps = {
  activeTasks: Task[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  toggleSection: () => void;
  toggleSortOrder: (type: 'date' | 'priority') => void;
  sortType: string;
  sortOrder: string;
  open: boolean;
};

function TaskList({
  activeTasks,
  deleteTask,
  completeTask,
  toggleSection,
  toggleSortOrder,
  sortType,
  sortOrder,
  open,
}: TaskListProps) {
  return (
    <div className="task-container">
      <h2>Tasks</h2>

      <Button
        className={`close-button ${open ? 'open' : ''}`}
        onClick={toggleSection}
      >
        +
      </Button>

      <div className="sort-controls">
        <Button
          className={`sort-button ${sortType === 'date' ? 'active' : ''}`}
          onClick={() => toggleSortOrder('date')}
        >
          By Date{' '}
          {sortType === 'date' && (sortOrder === 'asc' ? '\u2191' : '\u2193')}
        </Button>
        <Button
          className={`sort-button ${sortType === 'priority' ? 'active' : ''}`}
          onClick={() => toggleSortOrder('priority')}
        >
          By Priority{' '}
          {sortType === 'priority' &&
            (sortOrder === 'asc' ? '\u2193' : '\u2191')}
        </Button>
      </div>

      {open && (
        <ul className="task-list">
          {activeTasks.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
