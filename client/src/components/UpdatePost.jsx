import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../services/api';

const UpdatePost = () => {
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${postId}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setThumbnailUrl(post.thumbnailUrl); // Store current thumbnail URL
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (thumbnail) formData.append('thumbnail', thumbnail); // Only append if a new file is selected

        try {
            await api.put(`/api/posts/${postId}/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Post updated successfully!");
            navigate("/")
        } catch (error) {
            console.error("Error updating post:", error.response.data);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400 py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Edit Post</h2>
                    <form onSubmit={handleUpdatePost} className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-gray-700 font-medium mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="content" className="text-gray-700 font-medium mb-2">Content</label>
                            <textarea
                                id="content"
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 resize-none"
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="thumbnail" className="text-gray-700 font-medium mb-2">Thumbnail</label>
                            <input
                                type="file"
                                id="thumbnail"
                                onChange={handleThumbnailChange}
                                className="border border-gray-300 rounded-lg px-4 py-2"
                            />
                            {thumbnailUrl && !thumbnail && (
                                <img src={thumbnailUrl} alt="Current Thumbnail" className="mt-2 w-32 h-32 object-cover" />
                            )}
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
                            Update Post
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdatePost;
