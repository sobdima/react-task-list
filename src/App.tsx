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

  console.log('весь список задач ', tasksArray);
  console.log('невыполненные ', activeTasks);
  console.log('выполненные ', completedTasks);

  return (
    <>
      <div className="app">
        <div className="task-container">
          <h1>Task List Priority</h1>
          <button
            className={`close-button ${openSection.taskList ? 'open' : ''}`}
            onClick={() => toggleSection('taskList')}
          >
            +
          </button>
          {openSection.taskList && <TaskForm addTask={addTask} />}
        </div>

        <div className="task-container">
          <h2>Tasks</h2>
          <button
            className={`close-button ${openSection.tasks ? 'open' : ''}`}
            onClick={() => toggleSection('tasks')}
          >
            +
          </button>
          <div className="sort-controls">
            <button
              className={`sort-button ${sortType === 'date' ? 'active' : ''}`}
              onClick={() => toggleSortOrder('date')}
            >
              By Date{' '}
              {sortType === 'date' &&
                (sortOrder === 'asc' ? '\u2191' : '\u2193')}
            </button>
            <button
              className={`sort-button ${sortType === 'priority' ? 'active' : ''}`}
              onClick={() => toggleSortOrder('priority')}
            >
              By Priority{' '}
              {sortType === 'priority' &&
                (sortOrder === 'asc' ? '\u2193' : '\u2191')}
            </button>
          </div>
          {openSection.tasks && (
            <TaskList
              deleteTask={deleteTask}
              activeTasks={activeTasks}
              completeTask={completeTask}
            />
          )}
        </div>

        <div className="completed-task-container">
          <h2>Completed Tasks</h2>
          <button
            className={`close-button ${openSection.completedTasks ? 'open' : ''}`}
            onClick={() => toggleSection('completedTasks')}
          >
            +
          </button>
          {openSection.completedTasks && (
            <CompletedTaskList
              deleteTask={deleteTask}
              completeTask={completeTask}
              completedTasks={completedTasks}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
