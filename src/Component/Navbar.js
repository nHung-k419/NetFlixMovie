import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import '../App.css'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

import { AiFillHome } from "react-icons/ai";
import { HiFilm } from "react-icons/hi2";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiFilmSlateBold } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { CiSaveDown2 } from "react-icons/ci";
import { BiSolidCategory } from "react-icons/bi";
import { SiRotaryinternational } from "react-icons/si";
function Navbar({ props }) {
    const { toggle } = props
    const [Value_cate, setValue_cate] = useState([])
    const [ValueCountry, setValue_Country] = useState([])
    const search_inputRef = useRef(null)
    const [Toggle, setToggle] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const Navigate = useNavigate()
// console.log('screenWidth',screenWidth);

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
        fetch(`https://phimapi.com/the-loai`)
            .then(res => res.json())
            .then(data => {
                setValue_cate(data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://phimapi.com/quoc-gia`)
            .then(res => res.json())
            .then(data => {
                setValue_Country(data)
            })
    }, [])
    const Handle_Search = (e) => {
        if (e.key === 'Enter') {
            const slug_search = e.target.value
            if (slug_search) {
                Navigate('/Search_Movie/' + slug_search)
            } else if (slug_search === '') {
                search_inputRef.current.focus()
            }
        }
    }
    const handle_SearchClick = (e) => {


    }
    const handleToggle = () => {
        setToggle(!Toggle)
        toggle(!Toggle)
    }

    return (
        <div>
            {screenWidth >= 300 && screenWidth <= 768 ? <nav>
                <div className='flex justify-between'>
                    <CiMenuBurger className={`size-7 mt-3 text-white ml-2 cursor-pointer  ${Toggle && 'opacity-1'}`} onClick={() => handleToggle()} />
                    <div className={`absolute right-5 mt-3 ${Toggle ? 'opacity-20' : ''}`}>
                        <input ref={search_inputRef} onKeyDown={(e) => Handle_Search(e)} className='bg-slate-500 rounded-sm w-[200px] h-[35px] pl-3 relative outline-none  placeholder:text-white' type='text' placeholder='Tìm Kiếm...' ></input>
                        <button type="submit" onClick={(e) => handle_SearchClick(e)} className='absolute mt-[10px] left-44 text-gray-100 '><FaSearch /></button>
                    </div>
                </div>
                <div className={`z-20 top-0 fixed bg-slate-700 h-[99%] text-white ${Toggle ? 'w-80' : 'w-0'} duration-500`}>
                    <MdCancel className='absolute right-0 size-7' onClick={() => handleToggle()} />
                    <div className='relative'>
                        <h1 className={`uppercase font-bold text-center mt-5 mb-11 text-2xl text-yellow-400 ${!Toggle ? 'opacity-0' : 'opacity-1'}`}>NetFlix Movie</h1>
                    </div>
                    <div>
                        <div className='mt-0 ml-4 flex items-center'>
                            <AiFillHome className='text-2xl' />
                            <a className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `} href='/'>Trang Chủ</a>
                        </div>
                        <div className='mt-7 ml-4 flex items-center'>
                            <HiFilm className='text-2xl' />
                            <a href='/Single_Movie' className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `}>Phim Lẻ</a>
                        </div>
                        <div className='mt-7 ml-4 flex items-center'>
                            <BiSolidMoviePlay className='text-2xl' />
                            <a href='/Series_Movie' className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `}>Phim Bộ</a>
                        </div>
                        <div className='mt-7 ml-4 flex items-center'>
                            <PiFilmSlateBold className='text-2xl' />
                            <a href='/Anime_Movie' className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `}>Phim Hoạt Hình</a>
                        </div>
                        <div className='mt-7 ml-4 flex items-center'>
                            <PiTelevisionSimpleBold className='text-2xl' />
                            <a href='/TV_Shows' className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `}>TV Shows</a>
                        </div>
                        <div className='mt-7 ml-4 flex items-center'>
                            <CiSaveDown2 className='text-2xl' />
                            <a href='/Save_Movies' className={`ml-3 hover:text-orange-300 cursor-pointer text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `}>Phim Đã Lưu</a>
                        </div>
                        <div className='nav mt-7 ml-4 flex items-center'>
                            <BiSolidCategory className='text-2xl' />
                            <a className={` ml-3  group: hover:text-orange-300 cursor-pointer duration-300 flex items-center relative text-xl ${!Toggle ? 'opacity-0' : 'opacity-1'} `} >Thể Loại <FaChevronDown className='Down mt-1 ml-2 ' /></a>
                            <ul className='ul absolute bg-slate-700 h-full lg:h-[50%] lg:w-[640px] rounded-sm ml-5 z-10 '>
                                {Value_cate.map((item, index) => (
                                    <li key={index} className='ml-2 hover:text-orange-300 cursor-pointer text-mt-4 text-xl'>
                                        <a href={`/Category_Movie/${item.slug}`} data-slug="hanh-dong">{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='Nav2 mt-7 ml-4 flex items-center'>
                            <SiRotaryinternational className='text-2xl' />
                            <a className={`ml-3 hover:text-orange-300 cursor-pointer duration-300 text-xl flex items-center ${!Toggle ? 'opacity-0' : 'opacity-1'}`} >Quốc Gia <FaChevronDown className='Down2 mt-1 ml-2' /></a>
                            <ul className='ul absolute bg-slate-700  h-[70%] w-[620px]  rounded-sm ml-5 row-auto z-10'>
                                {ValueCountry.map((item, index) => (
                                    <li key={index} className='ml-2  hover:text-orange-300 cursor-pointer text-mt-4 text-xl'>
                                        <a href={`/Country_Movie/${item.slug}`} data-country="trung-quoc">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </nav> : <nav className='w-[94%]'>
                <div className='flex pl-10 font-medium ml-4 cursor-pointe lg:text-1xl text-white'>
                    <div className='mt-5'>
                        <a className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg' href='/'>Trang Chủ</a>
                    </div>
                    <div className='mt-5'>
                        <a href='/Single_Movie' className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg'>Phim Lẻ</a>
                    </div>
                    <div className='mt-5'>
                        <a href='/Series_Movie' className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg'>Phim Bộ</a>
                    </div>
                    <div className='mt-5'>
                        <a href='/Anime_Movie' className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg'>Phim Hoạt Hình</a>
                    </div>
                    <div className='mt-5'>
                        <a href='/TV_Shows' className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg'>TV Shows</a>
                    </div>
                    <div className='mt-5'>
                        <a href='/Save_Movies' className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg '>Phim Đã Lưu</a>
                    </div>
                    <div className='nav mt-5'>
                        <a className={` ml-5 group: hover:text-orange-300 cursor-pointer flex items-center relative lg:text-lg }`} >Thể Loại <FaChevronDown className='Down mt-1 ml-2 ' /></a>
                        <ul className='ul absolute bg-slate-700 h-[50%] w-[640px] rounded-sm ml-5 z-10  '>
                            {Value_cate.map((item, index) => (
                                <li key={index} className='ml-2 hover:text-orange-300 cursor-pointer text-mt-4 lg:text-lg'>
                                    <a href={`/Category_Movie/${item.slug}`} data-slug="hanh-dong">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='Nav2 mt-5'>
                        <a className='ml-5 hover:text-orange-300 cursor-pointer lg:text-lg  flex items-center' >Quốc Gia <FaChevronDown className='Down2 mt-1 ml-2' /></a>
                        <ul className='ul absolute bg-slate-700  h-[70%] w-[620px] rounded-sm ml-5 row-auto z-10'>
                            {ValueCountry.map((item, index) => (
                                <li key={index} className='ml-2  hover:text-orange-300 cursor-pointer text-mt-4 text-xl'>
                                    <a href={`/Country_Movie/${item.slug}`} data-country="trung-quoc">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='mr-6 absolute right-[73px] mt-5'>
                        <input ref={search_inputRef} onKeyDown={(e) => Handle_Search(e)} className='bg-slate-500 rounded-sm w-[250px] h-[35px] lg:w-[350px]  pl-3 relative outline-none  placeholder:text-white' type='text' placeholder='Tìm Kiếm...' ></input>
                        {/* <input type="submit" onClick={(e) => handle_SearchClick(e)} className='absolute right-3 mt-[10px] text-gray-100 ' ><FaSearch /></input> */}
                        <button type="submit" onClick={(e) => handle_SearchClick(e)} className='absolute right-3 mt-[10px] text-gray-100 '><FaSearch /></button>
                    </div>
                </div>
            </nav>}

        </div>
    )
}

export default Navbar