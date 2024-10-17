import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <div className='flex mx-5'>
        <div className=' w-1/2 pr-5'>
          <h2 className='text-2xl py-5'>Welcome to Cray Stream!</h2>
          <h3 className='text-xl pb-10'>Your Ultimate Virtual Event Experience Starts Here</h3>
          
          <p className='text-lg'>Transform Your Virtual Events</p>
          <p>At Cray Stream, we believe in turning ordinary online gatherings into extraordinary experiences.
            Whether you're hosting a webinar, conference, workshop, or social event, we provide the tools and
            support to make your event engaging, interactive, and seamless.
          </p>

          <p className='text-lg pt-10'>Why Choose Cray Stream?</p>
          <ul className='pl-8 list-disc'>
            <li>User-Friendly Interface: Effortlessly design and manage your event with our intuitive platform.</li>
            <li>Customizable Features: Tailor your event space to match your brand and objectives.</li>
            <li>Interactive Tools: Engage your audience with live polls, Q&A sessions, and networking opportunities.</li>
            <li>High-Quality Streaming: Enjoy crystal-clear video and audio for a professional presentation.</li>
            <li>24/7 Support: Our dedicated team is here to help you every step of the way.</li>
          </ul>

        </div>

        <div className='w-1/2 py-5'>
          <h4 className='text-2xl pb-5'>Get Started in Minutes</h4>
          <p>Creating a memorable virtual event is easy with Cray Stream.
            Simply sign up, set up your event, and let us handle the technical details.
            Focus on delivering your message and connecting with your audience, while we ensure everything runs smoothly.
          </p>

          <h5 className='text-2xl pt-10 pb-3'>Join the Cray Stream Community</h5>
          <p>Ready to elevate your virtual events? Sign up today and experience the future of online gatherings with Cray Stream.</p>

          <div className='flex flex-col justify-center pt-12'>
            <NavLink to="login"><button className='p-5 w-full outline mb-2'>Login</button></NavLink>
            <NavLink to="register"><button className='p-5 w-full bg-blue-600 text-white rounded-md'>Register</button></NavLink>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Landing;