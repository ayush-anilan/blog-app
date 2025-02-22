import React, { useEffect, useState } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';

const Hero = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className='relative container mx-auto w-1/2 items-center py-5 flex flex-col gap-10'>
            <div className='font-Agdasima'>
                <p className='text-6xl text-center font-semibold'>Latest Blogs</p>
            </div>
            <div className=''>
                <p className='text-xl font-semibold text-gray-800'>
                    Explore the Latest Blogs Across Technology, Lifestyle, and Startups: Dive into our newest articles, where we bring you cutting-edge tech innovations, modern lifestyle tips, and inspiring startup stories. Whether you're passionate about gadgets, personal growth, or entrepreneurial success, our latest posts offer fresh insights to keep you informed and inspired!
                </p>
            </div>

            {/* Show buttons only if the user is NOT logged in */}
            {!user && (
                <div className='flex items-center gap-2 mt-4 md:mt-0 md:gap-5 font-Agdasima'>
                    {/* Sign In Button */}
                    <div className='border border-black py-2 px-5 md:py-3 md:px-8 flex items-center gap-2'>
                        <p className='font-semibold text-lg md:text-2xl'>Sign In</p>
                        <LogIn className='w-5 h-5 md:w-6 md:h-6' />
                    </div>

                    {/* Get Started Button */}
                    <div className='border py-2 px-5 md:py-3 md:px-8 flex items-center gap-2 bg-black text-white'>
                        <p className='font-semibold text-lg md:text-2xl'>Get Started</p>
                        <ArrowRight className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
