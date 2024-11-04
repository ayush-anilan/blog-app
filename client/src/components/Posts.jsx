import React from 'react'
import PostCard from './PostCard'

const Posts = () => {
    return (
        <div className='relative container mx-auto flex flex-col gap-5 my-10 px-4'>
            <div className='self-center'>
                <ul className='flex flex-wrap gap-2 font-Agdasima text-lg sm:text-2xl font-normal'>
                    <li className='border bg-black text-white px-3 py-2 text-center cursor-pointer'>All</li>
                    <li className=' px-3 py-2 text-center cursor-pointer'>Technology</li>
                    <li className=' px-3 py-2 text-center cursor-pointer'>Startup</li>
                    <li className=' px-3 py-2 text-center cursor-pointer'>Lifestyle</li>
                </ul>
            </div>
            <div>
                {/* Responsive grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {/* Multiple PostCards */}
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                    <div className='border border-black'>
                        <PostCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts