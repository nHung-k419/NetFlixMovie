import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { FaPlay } from "react-icons/fa";
import GridLoader from "react-spinners/GridLoader";
function Series_Movie() {
    const [PartSeriesMovie, setPartSeriesMovie] = useState([])
    const [CurrentPage, setCurrentPage] = useState([])
    const [Time_spinner, setTime_spinner] = useState(true)
    const [Page, setPage] = useState(1)
    let numberPage = []
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${Page}&limit=18`)
            .then(res => res.json())
            .then(data => {
                setPartSeriesMovie(data.data.items)
                setCurrentPage([data.data.params.pagination.totalPages])
                setTime_spinner(true)
                setTimeout(() => {
                    setTime_spinner(false)
                }, 1000)
            })
    }, [Page]);
    for (let i = 1; i <= CurrentPage; i++) {
        numberPage.push(i)
    }
    const handleCheckPage = (e) => {
        setPage(e.target.dataset.index)
    }
    return (
        <div className='h-[100%]'>
            {Time_spinner ? <div className='flex justify-center h-screen items-center'>
                <GridLoader color='#36d7b7' />
            </div> : <div>
                <div className='w-[97%]'>
                    <div className='flex justify-between items-center'>
                        <h2 className='uppercase mt-10 font-bold text-white pl-[75px] flex gap-1'> Danh Sách Tất Cả Phim Hoạt Hình </h2>
                        <h2 className='uppercase mt-10 font-bold text-white pr-[53px] flex gap-1'>Trang {Page}</h2>
                    </div>
                    <div className='pl-[63px]  w-[97%] flex gap-2 flex-wrap mt-3'>
                        {PartSeriesMovie.map((item, index) => (
                            <div key={index}>
                                <div className='relative flex mt-3'>
                                    <div className='group cursor-pointer overflow-hidden ml-3'>
                                        <img className='w-[200px] h-[280px] object-cover rounded-sm group-hover:scale-125 duration-500 transition-transform group-hover:opacity-50' src={`https://img.phimapi.com/${item.poster_url}`} />
                                        <div className='absolute text-4xl text-white top-28 ml-20 hidden group-hover:block group-hover:animate-bounce '>
                                            <a href={'/infoMovie/' + item.slug}> <FaPlay /></a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className='mt-1 w-[200px]  text-white text-xl hover:text-yellow-300 cursor-pointer ml-3'>{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[93%] pl-[75px] '>
                    <div className='w-full mt-7 flex gap-5 overflow-x-scroll scrollbar-thin '>
                        {numberPage.map((item, index) => (
                            <div key={index}>
                                <button className={`w-[45px] h-[33px] rounded-sm bg-yellow-400 mb-2 font-bold hover:bg-yellow-500`} data-index={item} onClick={(e) => handleCheckPage(e)}>{item}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Series_Movie