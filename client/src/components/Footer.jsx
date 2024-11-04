import React from 'react'
import Logo from '../assets/logo.png'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
    return (
        <div className='relative bg-black text-white'>
            <div className='container mx-auto py-5 flex justify-between items-center'>
                <div className='flex items-center gap-2 md:gap-4 font-Mogra invert'>
                    <img src={Logo} alt="Logo" className='w-16 md:w-16 ' />
                    <p className=' text-2xl md:text-2xl invert'>ByteChronicles</p>
                </div>
                <div>
                    <p>All rights reserved. Copyright @bytechronicles</p>
                </div>
                <div className='flex gap-5'>
                    <div className='rounded-full w-10 h-10 bg-white flex items-center justify-center'>
                        <Facebook className='invert' />
                    </div>
                    <div className='rounded-full w-10 h-10 bg-white flex items-center justify-center'>
                        <Instagram className='invert' />
                    </div>
                    <div className='rounded-full w-10 h-10 bg-white flex items-center justify-center'>
                        <Twitter className='invert' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer