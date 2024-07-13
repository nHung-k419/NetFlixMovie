import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HashLoader from "react-spinners/HashLoader";
import { RiAddBoxFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import '../index.css'
import { handleGetAnimeMovie, handleGetSeriesMovie, handleGetSingleMovie, handleGetTVshowMovie, handleSavemovie } from '../Service';
function Content({ Toogle, getLocalStorage }) {
    const [isLoadding, setLoading] = useState(true)
    const [Api_single_movie, setApi_single_movie] = useState([])
    const [Api_series_movie, setApi_series_movie] = useState([])
    const [Api_anime_movie, setApi_anime_movie] = useState([])
    const [Api_Tv_Show, setApi_Tv_Show] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [SaveMovie, setSaveMovie] = useState([])
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
        const CallSingleMovie = async () => {
            const data = await handleGetSingleMovie()
            setApi_single_movie(data.data.items)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
        CallSingleMovie()
    }, [])
    useEffect(() => {
        const CallSeriesMovie = async () => {
            const data = await handleGetSeriesMovie()
            setApi_series_movie(data.data.items)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
        CallSeriesMovie()
    }, [])
    useEffect(() => {
        const CallAnimeMovie = async () => {
            const data = await handleGetAnimeMovie()
            setApi_anime_movie(data.data.items)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
        CallAnimeMovie()
    }, [])
    useEffect(() => {
        const CallTvshowMovie = async () => {
            const data = await handleGetTVshowMovie()
            setApi_Tv_Show(data.data.items)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
        CallTvshowMovie()
    }, [])
    const handleAddMovie = async (Slug) => {
        const data = await handleSavemovie(Slug)
        setSaveMovie(SaveMovie.concat(data))
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
                <HashLoader color='#36d7b7' />
            </div> : <div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px] '>Phim Lẻ</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_single_movie.map((item, index) => (
                            <a href={'/infoMovie/' + item.slug} key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        {/* <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div> */}
                                        {/* <div>
                                            <RiAddBoxFill onClick={() => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div> */}
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </a>
                        ))}</> : <Slider {...settings}>
                            {Api_single_movie.map((item, index) => (
                                <a href={'/infoMovie/' + item.slug} key={index} className='h-[400px]'>
                                <div className='relative flex mt-3'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden lg:group-hover:block lg:group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden lg:group-hover:block size-8 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden lg:group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px]  text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                            </a>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>Phim Bộ</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_series_movie.map((item, index) => (
                            <a href={'/infoMovie/' + item.slug} key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        {/* <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div> */}
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </a>
                        ))}</> : <Slider {...settings}>
                            {Api_series_movie.map((item, index) => (
                                <a href={'/infoMovie/' + item.slug} key={index} className='h-[400px]'>
                                <div className='relative flex mt-3'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden lg:group-hover:block lg:group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden lg:group-hover:block size-8 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden lg:group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px]  text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                            </a>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>Phim Hoạt Hình</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_anime_movie.map((item, index) => (
                            <a href={'/infoMovie/' + item.slug} key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        {/* <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div> */}
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </a>
                        ))}</> : <Slider {...settings}>
                            {Api_anime_movie.map((item, index) => (
                                <a href={'/infoMovie/' + item.slug} key={index} className='h-[400px]'>
                                <div className='relative flex mt-3'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden lg:group-hover:block lg:group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden lg:group-hover:block size-8 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden lg:group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px]  text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                            </a>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div>
                    <h2 className='lg:uppercase lg:mt-5 lg:text-white lg:pl-[75px] lg:font-bold lg:flex gap-1 uppercase mt-5 text-white pl-[15px]'>TV Shows</h2>
                    <div className='lg:pl-[63px] lg:w-[94%] '>
                        {screenWidth >= 300 && screenWidth <= 768 ? <>{Api_Tv_Show.map((item, index) => (
                            <a href={'/infoMovie/' + item.slug} key={index} className='mt-5'>
                                <div className='relative lg:mt-3 flex justify-center'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        {/* <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-24 hidden group-hover:block size-7 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-[-1px] left-18 hidden group-hover:block size-6 text-white' />
                                        </div> */}
                                    </div>
                                </div>
                                <h3 className='mt-4 text-white text-xl hover:text-yellow-300 cursor-pointer ml-3 flex justify-center'>{item.name}</h3>
                            </a>
                        ))}</> : <Slider {...settings}>
                            {Api_Tv_Show.map((item, index) => (
                                <a href={'/infoMovie/' + item.slug} key={index} className='h-[400px]'>
                                <div className='relative flex mt-3'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden lg:group-hover:block lg:group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden lg:group-hover:block size-8 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden lg:group-hover:block size-6 text-white' />
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px]  text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                            </a>
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