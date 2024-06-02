'use client';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
