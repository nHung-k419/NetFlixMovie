import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
function SaveMovies({getLocalStorage}) {
    getLocalStorage.map((item, index) => {
        console.log(item.movie.slug);
    })
    return (
        <div className={`${getLocalStorage.length > 12 ? 'h-full' : 'h-screen'}`}>
            <div>
                <div className='w-[97%] lg:pl-[65px] pl-[85px] mt-10'>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:font-bold gap-1 uppercase mt-5 text-white pl-[15px] '>Phim Đã Lưu</h2>
                    <div className='flex flex-wrap items-center '>
                        {getLocalStorage.map((item, index) =>
                            <div key={index}>
                                <div className='relative flex mt-10 '>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`${item.movie.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.movie.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px] h-[100px] text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.movie.name}</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaveMovies