import React, { useEffect, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { RiAddBoxFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { handleSavemovie, handlleSearchPage } from '../Service';
function Search_Movie() {
    const { slug_Search } = useParams()
    // console.log(slug_Search)
    // slug_Search === '' ? slug_Search : slug_Search
    const [PartSeriesMovie, setPartSeriesMovie] = useState([1])
    const [CurrentPage, setCurrentPage] = useState([])
    const [Time_spinner, setTime_spinner] = useState(true)
    const [title_Search, settitle_Search] = useState('')
    const [Page, setPage] = useState(1)
    const [SaveMovie, setSaveMovie] = useState([])
    let numberPage = []
    const handleAddMovie = async (Slug) => {
        const data = await handleSavemovie(Slug)
        setSaveMovie(SaveMovie.concat(data))
    }
    if (SaveMovie.length) {
        localStorage.setItem('MovieSave', JSON.stringify(SaveMovie))
        toast.success('Lưu Thành Công')
    }
    useEffect(() => {
        const CallPageSearch = async () => {
            const data = await handlleSearchPage(slug_Search)
            setPartSeriesMovie(data.data.items)
            settitle_Search(data.data.titlePage)
            setCurrentPage([data.data.params.pagination.totalPages])
            setTime_spinner(true)
            setTimeout(() => {
                setTime_spinner(false)
            }, 1000)
        }
        CallPageSearch()
    }, [slug_Search]);
    for (let i = 1; i <= CurrentPage; i++) {
        numberPage.push(i)
    }
    // const handleCheckPage = (e) => {
    //     setPage(e.target.dataset.index)
    // }
    return (
        <div className={`${PartSeriesMovie.length > 6 ? 'h-full' : 'h-screen '}`}>
            {PartSeriesMovie.length > 0 ? <div>
                {Time_spinner ? <div className='flex justify-center h-screen items-center'>
                    <HashLoader color='#36d7b7' />
                </div> : <div>
                    <div className='w-[97%]'>
                        <div className='flex justify-between items-center'>
                            <h2 className='uppercase mt-10 font-bold text-white pl-[75px] flex gap-1'>{title_Search} </h2>
                            <h2 className='uppercase mt-10 font-bold text-white pr-[53px] flex gap-1'>Trang {Page}</h2>
                        </div>
                        <div className='pl-[83px] w-[97%] flex gap-2 flex-wrap mt-3'>
                            {PartSeriesMovie.map((item, index) => (
                                <a href={'/infoMovie/' + item.slug} key={index}>
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
                        </div>
                    </div>
                </div>}
            </div> : <div className='h-screen flex items-center justify-center'>
                <h1 className=' font-bold lg:text-3xl uppercase text-gray-50 flex gap-2'>Không Tìm thấy Phim<p className='text-teal-500'> {slug_Search}</p></h1>
            </div>}

        </div>
    )
}

export default Search_Movie