import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountnavbar from './UserAccountnavbar';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-gray-750 w-full items-center p-3'>
      <div className='flex w-full items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <HandMetal />
          <h2>Todo List App</h2>
        </Link>
        {session?.user ? (
          <UserAccountnavbar />
        ) : (
          <Link className={buttonVariants()} href='/sign-in'>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
