'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  signUp: (identifier: string, password: string, otp?: string) => void;
  login: (identifier: string, password: string, otp?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = (identifier: string, password: string, otp?: string) => {
    const hardcodedPassword = 'password123';
    const hardcodedOTP = '123456';
    const isMobile = /^\d{10}$/.test(identifier);

    console.log('Login attempt with:', { identifier, otp, password });
    if (isMobile) {
      if (otp !== hardcodedOTP) {
        alert('Incorrect OTP. Please try again.');
        return;
      }
      console.log('Mobile login successful with:', { identifier });
    } else {
      if (password !== hardcodedPassword) {
        alert('Incorrect password. Please try again.');
        return;
      }
      console.log('Email login successful with:', { identifier });
    }

    setUser(identifier);
    alert('Login successful!');
    router.push('/');
  };

  const signUp = (identifier: string, _password: string, otp?: string) => {
    const hardcodedOTP = '123456';
    if (otp && otp !== hardcodedOTP) {
      alert('Incorrect OTP. Please try again.');
      return;
    }

    console.log('Sign-Up successful with:', { identifier });
    setUser(identifier);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider
      value={{ login, signUp, logout, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
