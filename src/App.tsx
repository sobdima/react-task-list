import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import CompletedTaskList from './components/CompletedTaskList/CompletedTaskList';

type SectionName = 'taskList' | 'tasks' | 'completedTasks';

interface SectionsState {
  taskList: boolean;
  tasks: boolean;
  completedTasks: boolean;
}

export interface Task {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
}

export type TaskCreateInput = Omit<Task, 'id' | 'completed'>;

function App() {
  const [openSection, setOpenSection] = useState<SectionsState>({
    taskList: true,
    tasks: true,
    completedTasks: true,
  });
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [sortType, setSortType] = useState('date'); // priority
  const [sortOrder, setSortOrder] = useState('asc'); //desc

  const activeTasks = sortTasks(tasksArray.filter((item) => !item.completed));
  const completedTasks = tasksArray.filter((item) => item.completed);

  function toggleSection(section: SectionName) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task: TaskCreateInput) {
    setTasksArray((prev) => [
      ...prev,
      { ...task, completed: false, id: Date.now() },
    ]);
  }

  function deleteTask(id: number) {
    setTasksArray(tasksArray.filter((item) => item.id !== id));
  }
  function completeTask(id: number) {
    setTasksArray(
      tasksArray.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      )
    );
  }

  function toggleSortOrder(type: string): void {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  }

  function sortTasks(tasksArray: Task[]) {
    const priorityOrder: Record<string, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    return tasksArray.slice().sort((a, b) => {
      if (sortType === 'priority') {
        return sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === 'asc'
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      }
    });
  }

  return (
    <>
      <div className="app">
        <TaskForm
          addTask={addTask}
          toggleSection={() => toggleSection('taskList')}
          open={openSection.taskList}
        />

        <TaskList
          activeTasks={activeTasks}
          deleteTask={deleteTask}
          completeTask={completeTask}
          toggleSection={() => toggleSection('tasks')}
          toggleSortOrder={toggleSortOrder}
          sortType={sortType}
          sortOrder={sortOrder}
          open={openSection.tasks}
        />

        <CompletedTaskList
          deleteTask={deleteTask}
          completeTask={completeTask}
          completedTasks={completedTasks}
          open={openSection.completedTasks}
          toggleSection={() => toggleSection('completedTasks')}
        />
      </div>
    </>
  );
}

export default App;
