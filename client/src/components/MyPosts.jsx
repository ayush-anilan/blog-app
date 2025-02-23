import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const fetchUserPosts = async () => {
            try {
                const res = await api.get(`/api/posts/user/${user.id}`);
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [user]);

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await api.delete(`/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId)); // Remove from UI
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!user) {
        return <p className='text-center text-gray-600'>You need to log in to view your posts.</p>;
    }

    return (
        <div>
            <Navbar />
            <div className='container mx-auto px-4 my-5'>
                <h2 className='text-3xl font-bold mb-5 mt-5'>My Posts</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="border p-4 rounded-lg shadow-md">
                                <img src={post.thumbnailUrl} alt={post.title} className="w-full h-40 object-cover rounded-md" />
                                <h3 className='text-xl font-semibold mt-2'>{post.title}</h3>
                                <p className='text-gray-600 text-sm'>{post.category}</p>
                                <p className='text-gray-700 mt-2'>{post.description}...</p>

                                {/* Action Buttons */}
                                <div className='flex justify-between mt-4'>
                                    <Link
                                        to={`/${post._id}/update`}
                                        className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-600 col-span-3'>No posts found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyPosts;
