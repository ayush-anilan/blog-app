import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import api from '../services/api'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('api/login', { email, password }, {
                withCredentials: true, // This enables cookies to be sent to the backend
            })

            // Assuming the login was successful, handle the response data as needed
            console.log('Login successful:', response.data)
            alert(response.data.message) // Show a message if login is successful
            // Redirect or set user data as needed
        } catch (err) {
            setError(err.response?.data || 'An error occurred during login')
        }
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400 py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    <form onSubmit={handleLogin} className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
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
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <button className="w-full  bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                            Login
                        </button>
                    </form>
                    {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                    <p className="text-center text-gray-600 mt-6">
                        Don’t have an account? <a href="/register" className="text-blue-600 font-semibold hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
