import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const UpdatePost = () => {
    // Assuming initial post data as placeholder values for demonstration
    const [title, setTitle] = useState("Current Post Title")
    const [content, setContent] = useState("This is the current content of the post.")
    const [thumbnail, setThumbnail] = useState(null)

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0])
    }

    const handleUpdatePost = (e) => {
        e.preventDefault()
        // Code to handle updating post, e.g., API call
        console.log("Post updated with:", { title, content, thumbnail })
    }

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
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="content" className="text-gray-700 font-medium mb-2">Content</label>
                            <textarea
                                name="content"
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
                                name="thumbnail"
                                id="thumbnail"
                                onChange={handleThumbnailChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-500 file:text-white file:font-semibold hover:file:bg-indigo-600"
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
                            Update Post
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UpdatePost
