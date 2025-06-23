'use client';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import {
  FormEventHandler,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { addTodo } from '@/components/api';
import { useRouter } from 'next/navigation';
import { TaskStatus } from '@/types/tasks';
import { Radio } from '@material-tailwind/react';

interface Props {
  username: string;
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const AddTask: React.FC<Props> = ({ username }) => {
  // const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const [newTaskDetails, setNewTaskDetails] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(
    TaskStatus.Todo
  );
  const [newTaskPriority, setNewTaskPriority] = useState<string>('Low');
  const [newTaskDuedate, setNewTaskDuedate] = useState<string>('');
  const [newTaskColor, setNewTaskColor] = useState<string>('green');
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [showDropdownStatus, setShowDropdownStatus] = useState<boolean>(false);
  const [showDropdownPriority, setShowDropdownPriority] =
    useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperRef1 = useRef<HTMLDivElement>(null);

  const optionsStatus = [
    TaskStatus.Done,
    TaskStatus.InProgress,
    TaskStatus.Todo,
  ];

  const optionsPriority = ['Low', 'Medium', 'High'];

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskColor(e.target.value);
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskDuedate(e.target.value);
  };
  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    // console.log(file);
    const base64 = await convertBase64(file);
    // console.log(base64);
    setImage(base64 as string);
  };

  function handleClick(option: TaskStatus) {
    if (showDropdownStatus) {
      setNewTaskStatus(option);
      setShowDropdownStatus(false);
    }
  }

  function handleClickPriority(option: string) {
    if (showDropdownPriority) {
      setNewTaskPriority(option);
      setShowDropdownPriority(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdownStatus(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef1.current &&
        !wrapperRef1.current.contains(event.target as Node)
      ) {
        setShowDropdownPriority(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef1]);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue.trim() === '') {
      setError('No Values?!');
    } else if (newTaskDetails.trim() === '') {
      setError('No Details?!');
    } else {
      const res = await addTodo({
        id: undefined,
        name: newTaskValue,
        description: newTaskDetails,
        status: newTaskStatus,
        priority: newTaskPriority,
        color: newTaskColor,
        due_date:
          newTaskDuedate === '' ? null : new Date(newTaskDuedate).toISOString(),
        image: image,
      });
      if ('error' in res) {
        setError(res.error);
      } else {
        setError('');
        setModalOpen(false);
        window.location.reload();
      }
    }
    setNewTaskValue('');
    setNewTaskDetails('');
    setNewTaskStatus(TaskStatus.Todo);
    setNewTaskColor('green');
    setNewTaskDuedate('');
    setNewTaskPriority('Low');
  };

  return (
    <div className='xl:pr-24'>
      <button
        onClick={() => {
          setModalOpen(true);
          setError('');
        }}
        className='btn btn-primary w-full text-white'
      >
        Add new task {username} <AiOutlinePlus className='ml-2' size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form id='2' onSubmit={handleSubmitNewTodo} className='space-y-2'>
          <input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            type='text'
            placeholder='Title'
            required
            className='input input-bordered mt-1 w-full bg-white text-black'
          />
          <textarea
            value={newTaskDetails}
            onChange={(e) => setNewTaskDetails(e.target.value)}
            placeholder='Description'
            required
            className='input input-bordered h-28 w-full bg-white p-4 text-black'
          />
          <div
            ref={wrapperRef1}
            style={{ position: 'relative', width: '100%' }}
          >
            <div className='w-full p-1 text-start text-gray-600'>Priority:</div>
            <input
              type='text'
              onFocus={() => setShowDropdownPriority(true)}
              placeholder='Priority'
              className='h-10 w-full bg-white p-4 text-black'
              value={newTaskPriority}
              // onChange={() => { }}
            />
            {showDropdownPriority && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 100000,
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {optionsPriority.map((option) => (
                  <li
                    onClick={(e) => {
                      handleClickPriority(option);
                    }}
                    key={option}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      color: '#000080',
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div className='w-full p-1 text-start text-gray-600'>Status:</div>
            <input
              type='text'
              onFocus={() => setShowDropdownStatus(true)}
              placeholder='Status'
              className='h-10 w-full bg-white p-4 text-black'
              value={newTaskStatus}
            />
            {showDropdownStatus && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 100000,
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {optionsStatus.map((option) => (
                  <li
                    onClick={(e) => {
                      handleClick(option);
                    }}
                    key={option}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      color: '#000080',
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='w-full'>
            <div className='w-full p-1 text-start text-gray-600'>Due Date:</div>
            <input
              type='date'
              placeholder='Due Date'
              className='w-full bg-white p-2 text-black'
              onChange={handleDate}
            />
          </div>
          <div className='w-full'>
            <div className='w-full p-2 text-left text-gray-700'>
              Upload Task Image
            </div>
            <input
              type='file'
              placeholder='Upload Image'
              className='w-full bg-white p-2 text-black '
              onChange={handleImage}
            />
          </div>

          <div className='flex flex-nowrap gap-10'>
            <div className='p-2 text-gray-700'> Color:</div>
            <Radio
              name='type'
              label='Green'
              color='green'
              value='green'
              crossOrigin=''
              defaultChecked
              onChange={handleColor}
            />
            <Radio
              name='type'
              label='Red'
              color='red'
              value='red'
              crossOrigin=''
              onChange={handleColor}
            />
            <Radio
              name='type'
              label='Blue'
              color='blue'
              value='blue'
              crossOrigin=''
              onChange={handleColor}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='flex w-full flex-row-reverse'>
            <button
              type='submit'
              className='btn btn-primary w-full text-white md:w-1/2'
            >
              Add New Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
