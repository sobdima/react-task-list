import type { Task } from '../../types';
import { TaskItem } from '../TaskItem/TaskItem';

type CompletedTaskListProps = {
  completedTasks: Task[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
  open: boolean;
  toggleSection: () => void;
};

function CompletedTaskList({
  completedTasks,
  deleteTask,
  completeTask,
  open,
  toggleSection,
}: CompletedTaskListProps) {
  return (
    <div className="completed-task-container">
      <h2>Completed Tasks</h2>
      <button
        className={`close-button ${open ? 'open' : ''}`}
        onClick={toggleSection}
      >
        +
      </button>
      {open && (
        <ul className="completed-task-list">
          {completedTasks.map((item) => (
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

export default CompletedTaskList;
