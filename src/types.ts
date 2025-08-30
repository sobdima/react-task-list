export interface Task {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
}

export type TaskCreateInput = Omit<Task, 'id' | 'completed'>;

export interface SectionsState {
  taskList: boolean;
  tasks: boolean;
  completedTasks: boolean;
}

export type SectionName = 'taskList' | 'tasks' | 'completedTasks';
