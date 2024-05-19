import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                console.log(response.data);
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.thumbnailUrl && (
                                <img
                                    src={post.thumbnailUrl}
                                    alt={`${post.title} thumbnail`}
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
