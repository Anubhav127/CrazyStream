import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='container mx-auto px-5 py-10'>
  <div className='flex flex-col md:flex-row'>
    <div className='w-full md:w-1/2 pr-5 mb-10 md:mb-0'>
      <h2 className='text-3xl font-bold py-5'>Welcome to Crazy Stream!</h2>
      <h3 className='text-2xl pb-5'>Your Ultimate Virtual Event Experience Starts Here</h3>
      
      <p className='text-lg pb-3'>Transform Your Virtual Events</p>
      <p className='pb-5'>
        At Crazy Stream, we believe in turning ordinary online gatherings into extraordinary experiences.
        Whether you're hosting a webinar, conference, workshop, or social event, we provide the tools and
        support to make your event engaging, interactive, and seamless.
      </p>

      <p className='text-lg pt-5'>Why Choose Crazy Stream?</p>
      <ul className='pl-8 list-disc space-y-2'>
        <li>User-Friendly Interface: Effortlessly design and manage your event with our intuitive platform.</li>
        <li>Customizable Features: Tailor your event space to match your brand and objectives.</li>
        <li>Interactive Tools: Engage your audience with live polls, Q&A sessions, and networking opportunities.</li>
        <li>High-Quality Streaming: Enjoy crystal-clear video and audio for a professional presentation.</li>
        <li>24/7 Support: Our dedicated team is here to help you every step of the way.</li>
      </ul>
    </div>

    {/* Right Section */}
    <div className='w-full md:w-1/2 py-5'>
      <h4 className='text-3xl font-bold pb-5'>Get Started in Minutes</h4>
      <p className='pb-5'>
        Creating a memorable virtual event is easy with Crazy Stream.
        Simply sign up, set up your event, and let us handle the technical details.
        Focus on delivering your message and connecting with your audience, while we ensure everything runs smoothly.
      </p>

      <h5 className='text-3xl font-bold pt-10 pb-3'>Join the Crazy Stream Community</h5>
      <p className='pb-5'>Ready to elevate your virtual events? Sign up today and experience the future of online gatherings with Crazy Stream.</p>

      <div className='flex flex-col justify-center pt-12'>
        <NavLink to="login">
          <button className='p-5 w-full mb-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition'>
            Login
          </button>
        </NavLink>
        <NavLink to="register">
          <button className='p-5 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
            Register
          </button>
        </NavLink>
      </div>
    </div>
  </div>
</div>

  )
}

export default Landing;