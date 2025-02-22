import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../services/api";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        content: "",
        thumbnail: null,
    });

    const categories = ["Technology", "Startup", "Lifestyle"];
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0], // Store the file object
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append("category", formData.category);
        postData.append("title", formData.title);
        postData.append("content", formData.content);
        postData.append("thumbnail", formData.thumbnail);

        try {
            const response = await api.post(
                `api/posts/${user.id}/create`,
                postData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Post Created:", response.data);
            alert("Post successfully created!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error creating post");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400 py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Post</h2>
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-gray-700 font-medium mb-2">Category</label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-gray-700 font-medium mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="content" className="text-gray-700 font-medium mb-2">Content</label>
                            <textarea
                                name="content"
                                id="content"
                                rows="6"
                                value={formData.content}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 resize-none"
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="thumbnail" className="text-gray-700 font-medium mb-2">Thumbnail</label>
                            <input
                                type="file"
                                name="thumbnail"
                                id="thumbnail"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white file:font-semibold hover:file:bg-orange-600"
                            />
                        </div>
                        <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-200">
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
