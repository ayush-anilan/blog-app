import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { LogOut, PlusCircle, FileText } from 'lucide-react';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        setUser(null);
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='flex flex-col md:flex-row container mx-auto justify-between items-center py-5'>
            {/* Logo */}
            <Link to={'/'}>
                <div className='flex items-center gap-2 md:gap-4'>
                    <img src={Logo} alt="Logo" className='w-16 md:w-20' />
                    <p className='font-bold text-2xl md:text-4xl'>ByteChronicles</p>
                </div>
            </Link>

            {/* Conditional Rendering for Authenticated User */}
            {user ? (
                <div className='flex items-center gap-5'>
                    <p className='text-lg font-semibold'>{user.name}</p>
                    <img src={user.profilePicture} alt="Profile" className='w-12 h-12 rounded-full' />

                    {/* My Posts Button */}
                    <Link to="/my-posts" className='flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800'>
                        <FileText className='w-5 h-5' />
                        My Posts
                    </Link>

                    {/* Create Post Button */}
                    <Link to="/create" className='flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>
                        <PlusCircle className='w-5 h-5' />
                        Create Post
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700'
                    >
                        <LogOut className='w-5 h-5' />
                        Logout
                    </button>
                </div>
            ) : (
                <div className='flex items-center gap-5'>
                    <Link to={'/login'} className='border border-black py-2 px-5'>Sign In</Link>
                    <Link to={'/register'} className='bg-black text-white py-2 px-5'>Get Started</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
