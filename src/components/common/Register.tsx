'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Styles from '../../styles/login.module.css';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = async (signupData: FieldValues) => {
    const { name, username, email, password, cpassword, bloodGroup } =
      signupData;
    if (
      !name ||
      !email ||
      !password ||
      !cpassword ||
      !bloodGroup ||
      !username
    ) {
      toast.error('All fields are required', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
      return;
    } else if (password.length < 6 || !/\d/.test(password)) {
      toast.error(
        'Password should be at least 6 characters long and contain a number',
        {
          position: 'top-right',
          icon: '😢',
          duration: 2500,
        }
      );
      return;
    } else if (password !== cpassword) {
      toast.error('Password and Confirm Password must be same', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
      return;
    } else {
      signupData = {
        name,
        username,
        email,
        password,
        bloodGroup,
        isAvailableToDonate: true,
      };

      setIsSubmitting(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
          }
        );
        const data = await response.json();
        if (data?.statusCode === 201 && data?.data?.email) {
          setIsSubmitting(false);
          toast.success('Account created successfully, please login', {
            position: 'top-right',
            icon: '🚀',
            duration: 2000,
          });
          router.push('/login');
        } else {
          setIsSubmitting(false);
          toast.error(data?.message, {
            position: 'top-right',
            icon: '😢',
            duration: 1500,
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error('Registration failed, please try again', {
          position: 'top-right',
          icon: '😢',
          duration: 1500,
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="grid h-screen grid-cols-12">
        <div
          className={`${Styles.bannerbg} col-span-12 lg:col-span-6 hidden lg:block`}
        ></div>
        <div className="flex justify-center items-center col-span-12 lg:col-span-6">
          <div className="h-screen flex justify-center items-center w-full">
            <div
              className="border border-slate-100 w-5/6 md:w-4/6 px-8 py-10"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              <h3 className="text-xl text-center font-semibold capitalize mb-6">
                Get Registered!
              </h3>
              <form
                className="space-y-4 md:space-y-3"
                onSubmit={handleSubmit(handleSignup)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    placeholder="Babul Akter"
                    {...register('name')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    placeholder="babulakterfsd"
                    {...register('username')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    placeholder="name@company.com"
                    {...register('email')}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    {...register('password')}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="cpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    {...register('cpassword')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="bloodGroup"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
                    {...register('bloodGroup')}
                  >
                    <option value="A-positive">A-positive</option>
                    <option value="A-negative">A-negative</option>
                    <option value="B-positive">B-positive</option>
                    <option value="B-negative">B-negative</option>
                    <option value="AB-positive">AB-positive</option>
                    <option value="AB-negative">AB-negative</option>
                    <option value="O-positive">O-positive</option>
                    <option value="O-negative">O-negative</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign Up
                </button>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Already Registered?</p>
                  <Link href="/login">
                    <span className="text-sm hover:text-red-300  hover:transition-all duration-300 underline">
                      Go to Login
                    </span>
                  </Link>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/">
                    <span className="text-sm font-semibold hover:text-red-300  hover:transition-all duration-300 underline">
                      Back to Home
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Register;
