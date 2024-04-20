import React from 'react'

const NavBar = () => {
    return (
        <div className='w-full bg-[#1995AD]'>
            <nav className='relative container mx-auto text-[#F1F1F2] flex justify-between h-16 items-center font-mono' >
                <div>
                    <a href="" className='font-bold text-2xl'>MindfulMemo</a>
                </div>
                <div className=''>
                    <ul className='flex gap-5'>
                        <div className='p-2'>
                            <li className='font-semibold text-lg'>Sign In</li>
                        </div>
                        <div className='border p-2 rounded-3xl bg-[#F1F1F2] text-[#1995AD]'>
                            <li className='font-semibold text-lg'>Get Started</li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar