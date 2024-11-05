import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import api from '../services/api'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [error, setError] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault()

        // Prepare form data for file upload
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if (profilePicture) {
            formData.append('profilePicture', profilePicture)
        }

        try {
            const response = await api.post('api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })

            alert('Registration successful')
            console.log('User registered:', response.data)
            // Redirect to login or handle successful registration as needed
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration')
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400 py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
                    <form onSubmit={handleRegister} className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-gray-700 font-medium mb-2">Username</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="profilePicture" className="text-gray-700 font-medium mb-2">Profile Picture</label>
                            <input
                                type="file"
                                name="profilePicture"
                                id="profilePicture"
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                            Register
                        </button>
                    </form>
                    {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:underline">Login</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register