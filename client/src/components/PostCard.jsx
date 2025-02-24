import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const PostCard = ({ id, title, content, category, thumbnailUrl, author }) => {
    return (
        <div className='w-full h-[520px] flex flex-col'>
            {/* 50% of the height for the image */}
            <div className='h-1/2'>
                <img src={thumbnailUrl} alt="Thumbnail" className='w-full h-full object-cover' />
            </div>

            {/* 75% of the height for the details */}
            <div className='h-3/4 border border-t-black p-4 flex flex-col justify-between'>
                <div className='w-fit bg-black text-white'>
                    <p className='text-sm p-1'>{category}</p>
                </div>

                <Link to={`/post/${id}`}>
                    <div>
                        <p className='text-xl font-bold'>{title}</p>
                    </div>
                </Link>

                {/* Restrict content length with line-clamp */}
                <div className='text-gray-600 line-clamp-3'>
                    <p>{content}</p>
                </div>

                <div className='text-sm text-gray-700 mt-2'>
                    <p><strong>Author:</strong> {author}</p>
                </div>

                <div className='flex items-center cursor-pointer'>
                    <Link to={`/post/${id}`} className='flex items-center'>
                        <p className='mr-2'>Read More</p>
                        <ArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
