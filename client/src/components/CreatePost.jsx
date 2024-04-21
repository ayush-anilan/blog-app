import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/posts/${user._id}`, { title, content })
            console.log(response.data);
            navigate('/')
        } catch (error) {
            console.error('Error creating post', error);
        }
    }

    return (
        <div className='relative container mx-auto mt-4 font-mono'>
            <div className='flex flex-col items-center justify-center  gap-5 py-5 h-96'>
                <h1 className='text-3xl font-semibold '>Create Post</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className=' w-96 flex flex-col gap-2'>
                        <label htmlFor="title" className='text-lg'>Title</label>
                        <input type="text" id='title' className='border rounded-full h-10 border-[#1995AD] px-4' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className=' w-96 flex flex-col gap-2'>
                        <label htmlFor="content" className='text-lg'>Content</label>
                        <textarea id="content" cols="30" rows="10" className='border  h-32 border-[#1995AD] px-4' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className='flex self-center border rounded-full hover:border-[#1995AD] '>
                        <button type='submit' className='bg-[#1995AD] rounded-full p-2 text-white w-36 hover:bg-[#F1F1F2] hover:text-[#1995AD] hover:border-[#1995AD]'>Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost