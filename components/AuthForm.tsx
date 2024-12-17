'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Props {
  isSignUp: boolean;
}

const AuthForm = ({ isSignUp }: Props) => {
  const { login, signUp } = useAuth();
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    console.log('opt:', otp);
    e.preventDefault();
    if (isSignUp) {
      if (loginType === 'email') {
        signUp(email, password);
      } else {
        signUp(mobile, password, otp);
      }
      alert('Signup successful!');
    } else {
      if (loginType === 'email') {
        login(email, password, otp);
      } else {
        login(mobile, password, otp);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-sm mx-auto bg-gray-50 rounded-lg shadow-md mt-10"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>

      <div className="flex justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setLoginType('email')}
          className={`py-2 px-4 rounded-md ${
            loginType === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {isSignUp ? 'Sign Up with Email' : 'Login with Email'}
        </button>
        <button
          type="button"
          onClick={() => setLoginType('mobile')}
          className={`py-2 px-4 rounded-md ${
            loginType === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {isSignUp ? 'Sign Up with Mobile' : 'Login with Mobile'}
        </button>
      </div>

      {loginType === 'email' && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
            required
          />
        </>
      )}

      {loginType === 'mobile' && (
        <>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md"
            required
          />
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      {isSignUp ? (
        <p className="mt-3">
          Have an account?{' '}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      ) : (
        <p className="mt-3">
          Don{"'"}t an account?{' '}
          <Link href="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
