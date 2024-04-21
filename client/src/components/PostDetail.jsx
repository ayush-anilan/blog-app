import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) {
                    return
                }
                const response = await axios.get(`/posts/${id}`)
                setPost(response.data)
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching post', error);
            }
        }
        fetchPost()
    }, [id])
    if (!post) return '';
    return (
        <div className='relative container mx-auto'>
            <div className='mx-96 my-5'>
                <h1 className='font-bold text-5xl'>{post.title}</h1>
                <h1 className='text-lg'>{post.author}</h1>
                <p className='text-base'>{moment(post.createdAt).format("MMM DD YYYY")}</p>
                <p className='text-xl'>{post.content}</p>
            </div>
        </div>
    )
}

export default PostDetail