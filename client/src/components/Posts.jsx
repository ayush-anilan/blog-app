import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/posts")
                setPosts(response.data)
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        }
        const fetchComments = async () => {
            try {
                const response = await axios.get("/comment")
                setComments(response.data)
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching comments', error);
            }
        }
        fetchPosts()
        fetchComments()
    }, [])
    return (
        <div className='relative container mx-auto'>
            <div className='grid border grid-cols-1 mx-96 my-5 gap-5'>
                {posts.map((post) => (
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-bold text-5xl'>{post.title}</h1>
                        <h4 className='text-lg'>{post.author}</h4>
                        <h5 className='text-base'>{moment(post.createdAt).format("MMM DD YYYY")}</h5>
                        <p className='text-xl'>
                            {post.content}
                        </p>
                        <h4 className='font-semibold'>Comments</h4>
                        <p>Name</p>
                        <p>email</p>
                        <p>content</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts