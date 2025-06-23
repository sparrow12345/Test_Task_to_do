export enum TaskStatus {
  InProgress = 'InProgress',
  Todo = 'Todo',
  Done = 'Done',
}

export interface ITask {
  id: string | undefined;
  name: string;
  description: string;
  status: TaskStatus;
  owner_id?: number;
  color: string;
  due_date: string;
  priority: string;
  image: string;
}
