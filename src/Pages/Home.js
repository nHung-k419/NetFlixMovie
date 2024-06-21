import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridLoader from "react-spinners/GridLoader";
import { RiAddBoxFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { FaSquareMinus } from "react-icons/fa6";
function Content({ Toogle, getLocalStorage }) {
    const [isLoadding, setLoading] = useState(true)
    const [Api_single_movie, setApi_single_movie] = useState([])
    const [Api_series_movie, setApi_series_movie] = useState([])
    const [Api_anime_movie, setApi_anime_movie] = useState([])
    const [Api_Tv_Show, setApi_Tv_Show] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [SaveMovie, setSaveMovie] = useState([])
    // const [Slug, handleAddMovie] = useState('')
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/danh-sach/phim-le`)
            .then(res => res.json())
            .then(data => {
                setApi_single_movie(data.data.items)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/danh-sach/phim-bo`)
            .then(res => res.json())
            .then(data => {
                setApi_series_movie(data.data.items)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh`)
            .then(res => res.json())
            .then(data => {
                setApi_anime_movie(data.data.items)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
                // console.log(data.data.items);
            })
    }, [])
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/danh-sach/tv-shows`)
            .then(res => res.json())
            .then(data => {
                setApi_Tv_Show(data.data.items)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])
    const handleAddMovie = (Slug) => {
        if (Slug !== '') {
            fetch(`https://phimapi.com/phim/${Slug}`)
                .then(res => res.json())
                .then(data => {
                    setSaveMovie(SaveMovie.concat(data))
                }) 
        }
    }
    if (SaveMovie.length) {
        localStorage.setItem('MovieSave', JSON.stringify(SaveMovie))
        toast.success('Lưu Thành Công')
    }
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 6,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                // `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };
    return (
        <div className={`lg:h-[100%] ${Toogle ? 'opacity-20' : ''}`}>
            {isLoadding ? <div className='flex justify-center lg:items-center lg:h-screen h-screen items-center mt-10'>
                <GridLoader color='#36d7b7' />
            </div> : <div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px] '>Phim Lẻ</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_single_movie.map((item, index) => (
                            <div key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={() => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </div>
                        ))}</> : <Slider {...settings}>
                            {Api_single_movie.map((item, index) => (
                                <div key={index}>
                                    <div className='relative lg:mt-3 '>
                                        <div className='group cursor-pointer overflow-hidden ml-3'>
                                            <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                            <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                                <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                            </div>
                                            <div>
                                                <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden group-hover:block size-8 text-white' />
                                            </div>
                                            <div>
                                                <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='mt-1 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>Phim Bộ</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_series_movie.map((item, index) => (
                            <div key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </div>
                        ))}</> : <Slider {...settings}>
                            {Api_series_movie.map((item, index) => (
                                <div key={index}>
                                    <div className='relative lg:mt-3 '>
                                        <div className='group cursor-pointer overflow-hidden ml-3'>
                                            <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                            <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                                <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                            </div>
                                            <div>
                                                <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden group-hover:block size-8 text-white' />
                                            </div>
                                            <div>
                                                <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='mt-1 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>Phim Hoạt Hình</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_anime_movie.map((item, index) => (
                            <div key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </div>
                        ))}</> : <Slider {...settings}>
                            {Api_anime_movie.map((item, index) => (
                                <div key={index}>
                                    <div className='relative lg:mt-3 '>
                                        <div className='group cursor-pointer overflow-hidden ml-3'>
                                            <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                            <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                                <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                            </div>
                                            <div>
                                                <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden group-hover:block size-8 text-white' />
                                            </div>
                                            <div>
                                                <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='mt-1 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>TV Shows</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_Tv_Show.map((item, index) => (
                            <div key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </div>
                        ))}</> : <Slider {...settings}>
                            {Api_Tv_Show.map((item, index) => (
                                <div key={index}>
                                    <div className='relative lg:mt-3 '>
                                        <div className='group cursor-pointer overflow-hidden ml-3'>
                                            <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                            <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                                <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                            </div>
                                            <div>
                                                <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden group-hover:block size-8 text-white' />
                                            </div>
                                            <div>
                                                <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='mt-1 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Content