import React from 'react'
import Logo from '../assets/logo.png'
import { ArrowRight } from 'lucide-react'

const PostCard = () => {
    return (
        <div className='w-full h-[520px] flex flex-col'>
            {/* 20% of the height for the image */}
            <div className='h-1/2'>
                <img src={Logo} alt="Thumbnail" className='w-full h-full object-cover' />
            </div>

            {/* 80% of the height for the details */}
            <div className='h-3/4 border border-t-black p-4 flex flex-col justify-between'>
                <div className='w-fit bg-black text-white'>
                    <p className='text-sm p-1'>Technology</p>
                </div>
                <div>
                    <p className='text-xl font-bold'>Title</p>
                </div>
                <div>
                    <p className='text-gray-600'>Description</p>
                </div>
                <div className='flex items-center  cursor-pointer'>
                    <p className='mr-2'>Read More</p>
                    <ArrowRight />
                </div>
            </div>
        </div>
    )
}

export default PostCard