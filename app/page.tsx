'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="w-full flex items-center justify-center min-h-screen p-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <h1>
          Please{' '}
          <Link className="text-blue-500" href="/login">
            login
          </Link>{' '}
          to access the application
        </h1>
      )}
    </div>
  );
}
