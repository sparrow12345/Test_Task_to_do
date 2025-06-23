import AddTask from '@/components/AddTask';
import TodoList from '@/components/TodoList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Your asynchronous functional component
export default async function mytasks() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (session?.user) {
    return (
      <main className='mx-auto  min-h-[93vh] justify-between bg-zinc-100 p-8 xl:p-24'>
        <div className='mx-auto flex w-full max-w-4xl flex-col gap-4'>
          <div className='my-5 flex flex-row-reverse text-center '>
            {/* <h1 className='text-2xl font-bold text-black'>Todo List App</h1> */}

            <AddTask username={session.user.username} />
          </div>
          <TodoList />
        </div>
      </main>
    );
  } else {
    return (
      <main className=' mx-auto min-h-screen justify-between bg-zinc-100 p-24'>
        <div className='my-5 flex flex-col gap-4 text-center'>
          <h1 className='text-2xl font-bold text-black'>
            Please sign in to view the contents of this page
          </h1>
        </div>
      </main>
    );
  }
}
