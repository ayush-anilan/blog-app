import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext)

    async function handleLoginSubmit(ev) {
        ev.preventDefault()
        try {
            const { data } = await axios.post("/login", { email: email, password: password })
            setUser(data)
            alert("Login successfull")
            setRedirect(true)
        } catch (err) {
            alert("Login failed " + err.message)
        }
    }
    if (redirect) {
        return <Navigate to={"/"} />
    }
    return (
        <div className='relative container mx-auto mt-4 font-mono'>
            <div className='flex flex-col items-center justify-center  gap-5 py-5 h-96'>
                <h1 className='text-3xl font-semibold '>Sign In</h1>
                <form action="" className='flex flex-col gap-2' onSubmit={handleLoginSubmit}>
                    <div className=' w-96 flex flex-col gap-2'>
                        <label htmlFor="email" className='text-lg'>Email</label>
                        <input type="email" className='border rounded-full h-10 border-[#1995AD] px-4' value={email} onChange={ev => setEmail(ev.target.value)} />
                    </div>
                    <div className=' w-96 flex flex-col gap-2'>
                        <label htmlFor="password" className='text-lg'>Password</label>
                        <input type="password" className='border rounded-full h-10 border-[#1995AD] px-4' value={password} onChange={ev => setPassword(ev.target.value)} />
                    </div>
                    <div className='flex self-center border rounded-full hover:border-[#1995AD] '>
                        <button type='submit' className='bg-[#1995AD] rounded-full p-2 text-white w-28 hover:bg-[#F1F1F2] hover:text-[#1995AD] hover:border-[#1995AD]'>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage