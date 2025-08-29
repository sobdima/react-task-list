import type { Task } from '../../App';
import { TaskItem } from '../TaskItem/TaskItem';

type CompletedTaskListProps = {
  completedTasks: Task[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
};

function CompletedTaskList({
  completedTasks,
  deleteTask,
  completeTask,
}: CompletedTaskListProps) {
  return (
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
  );
}

export default CompletedTaskList;
