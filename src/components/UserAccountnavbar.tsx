'use client';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { signOut } from 'next-auth/react';

const UserAccountnavbar = () => {
  return (
    <Button
      className={buttonVariants()}
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: '/',
        });
      }}
      variant='destructive'
    >
      Sign Out
    </Button>
  );
};

export default UserAccountnavbar;
