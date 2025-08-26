import { useState, type FormEvent } from 'react';

type SectionName = 'taskList' | 'tasks' | 'completedTasks';

interface SectionsState {
  taskList: boolean;
  tasks: boolean;
  completedTasks: boolean;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
}

type TaskCreateInput = Omit<Task, 'id' | 'completed'>;

function App() {
  const [openSection, setOpenSection] = useState<SectionsState>({
    taskList: true,
    tasks: true,
    completedTasks: true,
  });

  const [tasksArray, setTasksArray] = useState<Task[]>([]);

  const activeTasks = tasksArray.filter((item) => !item.completed);
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
            <button className="sort-button">By Date</button>
            <button className="sort-button">By Priority</button>
          </div>
          {openSection.tasks && (
            <TaskList deleteTask={deleteTask} activeTasks={activeTasks} />
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
              completedTasks={completedTasks}
            />
          )}
        </div>
      </div>
    </>
  );
}

interface TaskFromProps {
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

type TaskListProps = {
  activeTasks: Task[];
  deleteTask: (id: number) => void;
};

function TaskList({ activeTasks, deleteTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {activeTasks.map((item) => (
        <TaskItem key={item.id} task={item} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

type CompletedTaskListProps = {
  completedTasks: Task[];
  deleteTask: (id: number) => void;
};

function CompletedTaskList({
  completedTasks,
  deleteTask,
}: CompletedTaskListProps) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((item) => (
        <TaskItem key={item.id} task={item} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

//можно типом прописать наверное, как выше прописано у TaskList и CompletedTaskList
function TaskItem({
  task,
  deleteTask,
}: {
  task: Task;
  deleteTask: (id: number) => void;
}) {
  const { title, priority, deadline, id } = task;

  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
