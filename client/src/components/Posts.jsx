import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import api from '../services/api';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('api/posts'); // Adjust API route
                const data = res.data;
                // console.log(data);
                setPosts(data);
                setFilteredPosts(data); // Initialize filtered posts
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.category === category));
        }
    };

    return (
        <div className='relative container mx-auto flex flex-col gap-5 my-10 px-4'>
            <div className='self-center'>
                <ul className='flex flex-wrap gap-2 font-Agdasima text-lg sm:text-2xl font-normal'>
                    {['All', 'Technology', 'Startup', 'Lifestyle'].map(category => (
                        <li
                            key={category}
                            className={`px-3 py-2 text-center cursor-pointer border ${selectedCategory === category ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {/* Responsive grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <PostCard
                                key={post.idString}
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                category={post.category}
                                thumbnailUrl={post.thumbnail}
                                author={post.author?.name || "Unknown"}
                            />
                        ))
                    ) : (
                        <p className='text-center text-gray-600 col-span-4'>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Posts;
