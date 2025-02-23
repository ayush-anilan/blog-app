import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Instagram, Twitter } from "lucide-react";
import api from "../services/api";

const PostDetail = () => {
    const { postId } = useParams();
    console.log("Post id: ", postId);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${postId}`);
                const data = await response.data;
                console.log(data);

                setPost(data);
            } catch (err) {
                console.error(err.message);

                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

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
            </div>

            {/* Footer */}
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    );
};

export default PostDetail;
