import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const Navbar = () => {
    const userName = localStorage.getItem('userName');
    const [profilePicture, setProfilePicture] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfilePic = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await api.get(`/users/profile-picture/${userId}`, {
                    responseType: 'arraybuffer' // Important: specify the response type
                });
                console.log(response);
                const base64String = btoa(
                    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setProfilePicture(`data:image/png;base64,${base64String}`);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        if (userName) {
            fetchProfilePic();
        }
    }, [userName]);



    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("userName")
        localStorage.removeItem('userId');
        navigate("/login")
    }
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div>
                    <h1 className='text-white'>Blog APP</h1>
                </div>
                <div className="flex items-center">
                    {userName ? (
                        <div className="flex items-center">
                            <div>Write</div>
                            <div className="text-white mr-4">{userName}</div>
                            {profilePicture && (
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            )}
                            <button
                                onClick={handleLogout}
                                className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <a href="/login" className="text-white mr-4">Login</a>
                            <a href="/register" className="text-white">Register</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
