import React from 'react'
import Logo from '../assets/logo.png'
import { ArrowRight, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row relative container mx-auto justify-between items-center py-5'>
            {/* Logo and Site Name */}
            <Link to={'/'}>
                <div className='flex items-center gap-2 md:gap-4 font-Mogra'>
                    <img src={Logo} alt="Logo" className='w-16 md:w-20' />
                    <p className='font-bold text-2xl md:text-4xl'>ByteChronicles</p>
                </div>
            </Link>

            {/* Buttons: Sign In and Get Started */}
            <div className='flex items-center gap-2 mt-4 md:mt-0 md:gap-5 font-Agdasima'>
                {/* Sign In Button */}
                <Link to={'/login'}>
                    <div className='border border-black py-2 px-5 md:py-3 md:px-8 flex items-center gap-2'>
                        <p className='font-semibold text-lg md:text-2xl'>Sign In</p>
                        <LogIn className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </Link>

                {/* Get Started Button */}
                <Link to={'/register'}>
                    <div className='border py-2 px-5 md:py-3 md:px-8 flex items-center gap-2 bg-black text-white'>
                        <p className='font-semibold text-lg md:text-2xl'>Get Started</p>
                        <ArrowRight className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;