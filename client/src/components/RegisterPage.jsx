import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev) {
        ev.preventDefault()
        try {
            await axios.post('/register', { name: name, email: email, password: password })
            alert('Registration successfull')
            setRedirect(true)
        } catch (err) {
            alert("Registration failed " + err.message)
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="relative container mx-auto mt-5 font-mono">
            <div className='flex flex-col items-center justify-center  gap-5 py-5 h-96'>
                <h2 className="text-3xl font-semibold ">Sign Up</h2>
                <form className='flex flex-col gap-2' onSubmit={registerUser}>
                    <div className="w-96 flex flex-col gap-2'">
                        <label htmlFor="name" className="block">
                            <strong>Name</strong>
                        </label>
                        <input type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            className='border rounded-full h-10 border-[#1995AD] px-5'
                            value={name}
                            onChange={ev => setName(ev.target.value)}

                        />
                    </div>
                    <div className="w-96 flex flex-col gap-2'">
                        <label htmlFor="email" className="block">
                            <strong>Email</strong>
                        </label>
                        <input type="email"
                            placeholder='Enter Email'
                            autoComplete='off'
                            className='border rounded-full h-10 border-[#1995AD] px-5'
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                    </div>
                    <div className="w-96 flex flex-col gap-2'">
                        <label htmlFor="password" className="block">
                            <strong>Password</strong>
                        </label>
                        <input type="password"
                            placeholder='Enter Password'
                            className='border rounded-full h-10 border-[#1995AD] px-5'
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}

                        />
                    </div>
                    <div className="flex self-center border rounded-full hover:border-[#1995AD] ">
                        <button type="submit" className="bg-[#1995AD] rounded-full p-2 text-white w-28 hover:bg-[#F1F1F2] hover:text-[#1995AD] hover:border-[#1995AD]">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p>Already have an account <Link to={"/login"}>Login</Link></p>
            </div>
        </div>

    );
}

export default RegisterPage