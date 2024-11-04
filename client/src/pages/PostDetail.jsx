import React from 'react'
import Navbar from '../components/Navbar'
import Logo from '../assets/logo.png'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Footer from '../components/Footer'

const PostDetail = () => {
    return (
        <div>
            <Navbar />
            <div className='relative container mx-auto px-4 md:px-8'>
                <div className='text-center text-3xl md:text-5xl font-semibold mt-10'>
                    <p>Title</p>
                </div>
                <div className='flex justify-center text-center mt-5'>
                    <div>
                        <img src={Logo} alt="profile" className='w-16 h-16 md:w-20 md:h-20 border border-gray-500 rounded-full' />
                        <p className='text-lg md:text-2xl mt-2'>Name</p>
                    </div>
                </div>
                <div className='border w-full md:w-4/5 block mx-auto mt-5'>
                    <img src={Logo} alt="thumbnail" className='w-full h-[300px] md:h-[600px] object-cover' />
                </div>
                <div className='w-full md:w-4/5 border mx-auto text-base md:text-xl mt-5'>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae nobis non molestias! Molestias labore, earum vero possimus ratione culpa corrupti iste, id vel dolores expedita, sunt alias fugit dolore.</p>
                </div>
                <div className='w-full md:w-4/5 border mx-auto mt-10'>
                    <p className='text-sm md:text-base font-semibold'>Share this article on social media</p>
                    <div className='flex justify-center md:justify-start items-center gap-2 mt-2'>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center'>
                            <Facebook className='invert' />
                        </div>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center'>
                            <Instagram className='invert' />
                        </div>
                        <div className='rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center'>
                            <Twitter className='invert' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default PostDetail
