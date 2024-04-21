import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

const NavBar = () => {
    const { user, setUser } = useContext(UserContext)


    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    return (
        <div className='w-full bg-[#1995AD]'>
            <nav className='relative container mx-auto text-[#F1F1F2] flex justify-between h-16 items-center font-mono' >
                <div>
                    <Link to={"/"}>
                        <a href="" className='font-bold text-2xl'>MindfulMemo</a>
                    </Link>
                </div>
                <div className=''>
                    {!user && (
                        <div className='flex gap-5'>
                            <div className='p-[8px]'>
                                <Link to={'/posts'}>
                                    <a href="" className='font-semibold text-lg'>Posts</a>
                                </Link>
                            </div>
                            <ul className='flex gap-5'>
                                <div className='p-2  rounded-3xl hover:bg-[#F1F1F2] hover:text-[#1995AD]' >
                                    <Link to={'/login'}>
                                        <li className='font-semibold text-lg'>Sign In</li>
                                    </Link>
                                </div>
                                <div className='border p-2 rounded-3xl bg-[#F1F1F2] text-[#1995AD]'>
                                    <Link to={"/register"}>
                                        <li className='font-semibold text-lg'>Get Started</li>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    )}
                    {!!user && (
                        <div className='flex gap-4'>
                            <div>
                                <Link to={'/posts'}>
                                    <a href="">Posts</a>
                                </Link>
                            </div>
                            <div>
                                {user.name}
                            </div>
                            <div>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    )}
                </div>

            </nav>
        </div>
    )
}

export default NavBar