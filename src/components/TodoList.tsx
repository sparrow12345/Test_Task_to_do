'use client';
import { ITask } from '@/types/tasks';
import React, { useEffect, useState } from 'react';
import Task from './Task';

const TodoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.tasks);
      setFilteredTasks(data.tasks);
    };
    fetchTasks();
  }, []);

  const handleFilterChange = (status: string | null) => {
    // console.log(status);
    if (status == 'All') {
      setFilteredTasks(tasks);
      return;
    }
    // console.log(status);

    const data = tasks.filter((task) => task.status === status);

    // console.log(data);
    setFilteredTasks(data);
  };

  return (
    <div className='mx-auto w-full max-w-2xl overflow-x-auto'>
      <div className='mb-4'>
        {' '}
        {/* Adjust margin as needed */}
        <label className='mr-2 text-black'>Filter by Status:</label>{' '}
        {/* Adjust margin as needed */}
        <select
          className='rounded-md border border-gray-300 p-2 text-sm outline-none'
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value={null}>All</option>
          <option value='Todo'>Todo</option>
          <option value='InProgress'>InProgress</option>
          <option value='Done'>Done</option>
        </select>
      </div>

      <table className='table'>
        <thead>
          <tr className='text-black'>
            <th>Tasks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!filteredTasks &&
            filteredTasks.length &&
            filteredTasks.map((task) => <Task key={task.id} task={task} />)}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
