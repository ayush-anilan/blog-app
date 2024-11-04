import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Register = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400 py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>
                    <form className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-700 font-medium mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                            Register
                        </button>
                    </form>
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
