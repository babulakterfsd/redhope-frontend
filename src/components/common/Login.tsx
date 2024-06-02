'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import Styles from '../../styles/login.module.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const handleLogin = async (loginData: FieldValues) => {
    if (!loginData?.email || !loginData?.password) {
      toast.error('Email or Password is missing', {
        position: 'top-right',
        icon: '😢',
        duration: 1500,
      });
    } else {
      setIsSubmitting(true);
      try {
        signIn('credentials', {
          email: loginData.email,
          password: loginData.password,
          redirect: false,
        }).then((res) => {
          if (res?.error) {
            setIsSubmitting(false);
            toast.error('Invalid email or password', {
              position: 'top-right',
              icon: '😢',
              duration: 1500,
            });
          } else {
            router.push(callbackUrl || '/dashboard');
            toast.success('Logged in successfully', {
              position: 'top-right',
              icon: '🚀',
              duration: 1500,
            });
            setIsSubmitting(false);
          }
        });
      } catch (error) {
        setIsSubmitting(false);
        toast.error('Invalid email or password');
      }
    }
  };

  const toggleShowingPassword = () => {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsPasswordVisible(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid h-screen grid-cols-12">
        <div
          className={`${Styles.bannerbg} col-span-12 lg:col-span-6 hidden lg:block`}
        ></div>
        <div className="flex justify-center items-center col-span-12 lg:col-span-6">
          <div
            className="border border-slate-100 w-5/6 md:w-4/6 px-4 lg:px-8 py-4 lg:py-10"
            data-aos="fade-down"
            data-aos-duration="1500"
          >
            <h3 className="text-xl text-center font-semibold capitalize mb-6">
              Please login to continue !
            </h3>

            <div className="shadow bg-gray-50 p-4 my-6 mx-auto rounded-md flex justify-center flex-col items-center">
              <h5 className="text-red-300 underline">Demo Admin</h5>
              <p className="text-sm">
                Email:{' '}
                <span className="font-semibold">babulakterfsd@gmail.com</span>
              </p>
              <p className="text-sm">
                Password: <span className="font-semibold">babul123</span>
              </p>
            </div>
            <div className="shadow bg-gray-50 p-4 my-6 mx-auto rounded-md flex justify-center flex-col items-center">
              <h5 className="text-red-300 underline">Demo Donor</h5>
              <p className="text-sm">
                Email: <span className="font-semibold">xpawal@gmail.com</span>
              </p>
              <p className="text-sm">
                Password: <span className="font-semibold">awal123</span>
              </p>
            </div>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                  placeholder="name@company.com"
                  {...register('email')}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                  {...register('password')}
                />
                <span
                  className="absolute cursor-pointer top-10 right-3"
                  onClick={toggleShowingPassword}
                >
                  {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-red-100"
                disabled={isSubmitting}
              >
                Sign in
              </button>
              <div className="flex items-center justify-end space-x-1">
                <p className="text-sm">Not Registered Yet?</p>
                <Link href="/register">
                  <span className="text-sm hover:text-red-300  hover:transition-all duration-300 underline">
                    Go to Signup
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
    </DashboardLayout>
  );
};

export default Login;
