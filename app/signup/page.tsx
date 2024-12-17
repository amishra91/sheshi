'use client';
import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return !isAuthenticated ? <AuthForm isSignUp={true} /> : null;
};

export default Page;
