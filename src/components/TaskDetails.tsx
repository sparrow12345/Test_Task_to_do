import React, { useEffect, useState } from 'react';
import { ITask } from '@/types/tasks';
import Image from 'next/image';

interface TaskDetailsProps {
  task: ITask;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const { name, description, status, owner_id, due_date, priority, image } =
    task;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const textDecoder = new TextDecoder();
    const imageUrl = textDecoder.decode(
      Buffer.from(task.image) as unknown as ArrayBuffer
    );
    if (imageUrl !== '//') setImageUrl(imageUrl);
  }, [task.image]);

  return (
    <div className='overflow-hidden rounded border-l-4 border-gray-200 bg-white shadow-lg'>
      <div className={`bg-black-500 p-4`}>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>{name}</h2>
          <span
            className={`bg-black-200 text-black-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className='p-4'>
        <p className='text-sm text-gray-700'>{description}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            className='mt-2 max-w-full rounded'
            width={300}
            height={300}
          />
        )}
        <div className='mt-4'>
          {due_date && (
            <p className='text-sm text-gray-600'>
              <strong>Due:</strong> {due_date.split('T')[0]}
            </p>
          )}
          <p className='text-sm text-gray-600'>
            <strong>Priority:</strong> {priority}
          </p>
          <p className='text-sm text-gray-600'>
            <strong>Color:</strong> {task.color}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
