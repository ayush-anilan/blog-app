import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Instagram, Twitter, Trash2 } from "lucide-react";
import api from "../services/api";

const PostDetail = () => {
    const { postId } = useParams();
    // console.log("PostId: ", postId);

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [authorId, setAuthorId] = useState("")
    const [userName, setUserName] = useState(""); // Store user name from token
    const [userId, setUserId] = useState(""); // Store logged-in user ID
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("post author id:", authorId);



    // Fetch Post & Comments
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${postId}`);
                setPost(response.data);
                setAuthorId(response.data.author._id)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await api.get(`/api/comments/${postId}`);
                setComments(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };

        fetchPost();
        fetchComments();
    }, [postId]);

    // Get user details from token
    useEffect(() => {
        const user = localStorage.getItem("user"); // Retrieve token from local storage
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser.name); // Assuming token contains 'name'
                setUserId(parsedUser.id); // Assuming token contains 'id'
                console.log("UserId: ", userId);

            } catch (err) {
                console.error("Invalid token:", err);
            }
        }
    }, []);

    // Submit a new comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;

        try {
            const response = await api.post(`/api/comments/${postId}`, {
                name: userName || "Anonymous",
                email: "anonymous",
                content: commentContent,
            });

            setComments([response.data, ...comments]); // Add new comment to the list
            setCommentContent(""); // Clear comment field
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    // Delete a comment (only the post owner can delete)
    const handleCommentDelete = async (commentId) => {
        if (!post || authorId !== userId) {
            alert("You are not authorized to delete this comment.");
            return;
        }

        // Confirmation alert
        const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
        if (!isConfirmed) return;

        try {
            await api.delete(`/api/comments/${commentId}`);
            setComments(comments.filter((comment) => comment._id !== commentId)); // Remove from UI
            alert("Comment deleted successfully.");
        } catch (err) {
            console.error("Error deleting comment:", err);
            alert("Failed to delete the comment. Please try again.");
        }
    };

    if (loading) return <p className="text-center mt-10 text-xl">Loading post...</p>;
    if (error) return <p className="text-center mt-10 text-xl text-red-500">Error: {error}</p>;

    return (
        <div>
            <Navbar />
            <div className="relative container mx-auto px-4 md:px-8">
                {/* Post Title */}
                <div className="text-center text-3xl md:text-5xl font-semibold mt-10">
                    <p>{post.title}</p>
                </div>

                {/* Author Info */}
                <div className="flex justify-center text-center mt-5">
                    <div>
                        <img
                            src={post.author.profilePicture || "/default-avatar.png"}
                            alt="Author"
                            className="w-16 h-16 md:w-20 md:h-20 border border-gray-500 rounded-full"
                        />
                        <p className="text-lg md:text-2xl mt-2">{post.author.name}</p>
                    </div>
                </div>

                {/* Post Image */}
                <div className="border w-full md:w-4/5 block mx-auto mt-5">
                    <img
                        src={post.thumbnail}
                        alt="Post Thumbnail"
                        className="w-full h-[300px] md:h-[600px] object-cover"
                    />
                </div>

                {/* Post Content */}
                <div className="w-full md:w-4/5 mx-auto text-base md:text-xl mt-5">
                    <p>{post.content}</p>
                </div>

                {/* Social Media Share */}
                <div className="w-full md:w-4/5 mx-auto mt-10">
                    <p className="text-sm md:text-base font-semibold">Share this article on social media</p>
                    <div className="flex justify-center md:justify-start items-center gap-2 mt-2">
                        <div className="rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center">
                            <Facebook className="invert" />
                        </div>
                        <div className="rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center">
                            <Instagram className="invert" />
                        </div>
                        <div className="rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center bg-black justify-center">
                            <Twitter className="invert" />
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="w-full md:w-4/5 mx-auto mt-10">
                    <h2 className="text-2xl font-semibold">Comments</h2>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-gray-100"
                            placeholder="Your Name"
                            value={userName || "Anonymous"}
                            readOnly
                        />
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows="3"
                            placeholder="Write a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit Comment
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="mt-5">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="border-b py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{comment.name || "Anonymous"}</p>
                                        <p className="text-gray-600">{comment.content}</p>
                                        <span className="text-xs text-gray-400">
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    {/* Delete button (only for post owner) */}
                                    {authorId === userId && (
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleCommentDelete(comment._id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    );
};

export default PostDetail;
