'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    toast.error('This feature is not available right now', {
      position: 'top-right',
      duration: 1500,
      icon: '❌',
    });
    resetForm();
  };

  return (
    <div className="grid grid-cols-12 mt-6 md:mt-10 lg:mt-8">
      <div className="col-span-12 lg:col-span-5 sm:pl-20 md:pl-16 lg:pl-28">
        <h2 className="text-[1.2rem] lg:text-2xl font-[700] lg:font-semibold  mb-1">
          Feel Free to Contact Us.
        </h2>
        <p className="lg:mt-3 opacity-75 sm:w-3/5 md:w-full">
          Redhope always ready to help you. Please feel free to contact us. Our
          team will get back to you as soon as possible.
        </p>
        {/* mail */}
        <div className="flex gap-x-3 items-center my-3 lg:my-6 ">
          <div className="flex flex-col">
            <h4 className="uppercase opacity-75 text-sm lg:text-lg">Mail Us</h4>
            <p className="opacity-90">babulakterfsd@gmail.com</p>
          </div>
        </div>
        {/* call */}
        <div className="flex gap-x-3 items-center lg:my-6">
          <div className="flex flex-col">
            <h4 className="uppercase opacity-75">Call Us</h4>
            <p className="opacity-90">+88 01740 020464</p>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 sm:pl-20 md:pl-16 lg:px-16">
        <form
          className="space-y-8 mt-16 lg:mt-0 mb-6 lg:mb-0 sm:w-4/5 md:w-full"
          onSubmit={handleFormSubmit}
        >
          <div className="grid grid-cols-12 gap-y-6 lg:gap-x-6">
            <input
              type="text"
              id="name"
              className="col-span-12 lg:col-span-6 shadow-sm text-sm rounded-lg block w-full px-2.5 py-4 bg-gray-300 text-black opacity-90 shadow-sm-light focus:outline-none"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              className="col-span-12 lg:col-span-6 shadow-sm text-sm rounded-lg block w-full px-2.5 py-4 bg-gray-300 text-black opacity-90 shadow-sm-light focus:outline-none"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="subject"
              className="col-span-12 lg:col-span-6 shadow-sm text-sm rounded-lg block w-full px-2.5 py-4 bg-gray-300 text-black opacity-90 shadow-sm-light focus:outline-none"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <textarea
              id="message"
              rows={6}
              className="col-span-12 lg:col-span-6 shadow-sm text-sm rounded-lg block w-full p-2.5 bg-gray-300 text-black opacity-90 shadow-sm-light focus:outline-none"
              placeholder="Your message..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              aria-label="send message"
              className="lg:mt-1 bg-red-400 hover:bg-red-300 transition-all duration-300 rounded px-2 py-3 w-full lg:w-48 font-semibold text-white"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
