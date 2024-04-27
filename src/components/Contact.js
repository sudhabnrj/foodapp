import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import {Link} from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Contact = () => {

  const [state, handleSubmit, reset] = useForm('mbjnqvwb');
  if (state.succeeded) {
    return (
      <div className="h-screen">
        <div className="container mx-auto mt-12">
          <div className="flex justify-center items-center">
            Thank you for signing up!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="px-4 lg:px-0 mt-12">
        <div className="fixed right-0 top-1/2 flex flex-col gap-4 mr-6 max-[700px]:hidden">
          <Link to="https://github.com/sudhabnrj" target="_blank">
            <GitHubIcon className="bg-red-500 text-white !w-10 !h-10 p-2 rounded-full  cursor-pointer"/>
          </Link>
          <Link to="https://www.linkedin.com/in/sudhachandan-banerjee" target="_blank">
            <LinkedInIcon className="bg-red-500 text-white !w-10 !h-10 p-2 rounded-full cursor-pointer"/>
          </Link>
        </div>
        <div className="mx-auto w-full sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium dark:text-slate-300 text-slate-700">Full Name</label>
              <input type="text" name="name" id="name" placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0]
              bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium dark:text-slate-300 text-slate-700">
                Email Address
              </label>
              <input type="email" name="email" id="email" required placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <ValidationError className="text-red-500" field="email" prefix="Email" errors={state.errors} />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="mb-3 block text-base font-medium dark:text-slate-300 text-slate-700">
                Subject
              </label>
              <input type="text" name="subject" id="subject" placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium dark:text-slate-300 text-slate-700">Message</label>
              <textarea rows="4" name="message" id="message" placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button disabled={state.submitting} className="hover:shadow-form rounded-md bg-red-400 py-3 px-8 
                text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
