import { type Task } from '../../App';
import { TaskItem } from '../TaskItem/TaskItem';

type TaskListProps = {
  activeTasks: Task[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
};

function TaskList({ activeTasks, deleteTask, completeTask }: TaskListProps) {
  return (
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
  );
}

export default TaskList;
