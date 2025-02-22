import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PostCard from '../components/PostCard';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) return;

        const fetchUserPosts = async () => {
            try {
                const res = await api.get(`/api/posts/user/${user.id}`); // Adjust API route
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [user]);

    if (!user) {
        return <p className='text-center text-gray-600'>You need to log in to view your posts.</p>;
    }

    return (
        <div className='container mx-auto px-4 my-10'>
            <h2 className='text-3xl font-bold mb-5'>My Posts</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            thumbnailUrl={post.thumbnailUrl}
                            author={post.author?.name || "Unknown"}
                        />
                    ))
                ) : (
                    <p className='text-center text-gray-600 col-span-4'>No posts found.</p>
                )}
            </div>
        </div>
    );
};

export default MyPosts;
