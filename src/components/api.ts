import { ITask } from '@/types/tasks';

const baseUrl = 'http://localhost:3001';

export const addTodo = async (
  todo: ITask
): Promise<ITask | { error: string }> => {
  const res = await fetch(`/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    const data = await res.json();
    return { error: data.error };
  }
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<boolean> => {
  // console.log(todo);
  const res = await fetch(`/api/tasks/${todo.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (res.ok) {
    return true;
  }
  return false;
  // const updatedTodo = await res.json();
  // return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const data = await res.json();
    return true;
  } else {
    return false;
  }
};

export const getToDo = async (id: string): Promise<ITask | null> => {
  const res = await fetch(`/api/tasks/${id}`, {
    cache: 'no-store',
    method: 'GET',
  });
  const task = await res.json();
  return task.task || null;
};
