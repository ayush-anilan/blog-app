import React, { useEffect, useState } from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import axios from 'axios';
import moment from "moment";

const Index = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/posts")
                const postsData = response.data.map(post => ({
                    ...post,
                    author: post.author.toString() // Convert ObjectId to string
                }));
                setPosts(postsData)
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className='relative container mx-auto py-5 border'>
            <div>
                <div>
                    <h3> <TrendingUpIcon className='border rounded-full' /> Trending on MindfulMemo</h3>
                </div>
                <div className='relative border grid grid-cols-3'>
                    {posts.map((post) => (
                        <div className='border mx-8 my-2' key={post._id}>
                            <h5>{post.author}</h5>
                            <h3>{post.title}</h3>
                            <p>{moment(post.createdAt).format("MMM DD,YYYY")}</p>
                        </div>
                    ))}

                </div>
            </div>
            <div className='relative border grid grid-cols-1'>
                <div className='border'>
                    {posts.map((post) => (
                        <div className='border mx-8 my-2' key={post._id}>
                            <h5>{post.author}</h5>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>{moment(post.createdAt).format("MMM DD,YYYY")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index