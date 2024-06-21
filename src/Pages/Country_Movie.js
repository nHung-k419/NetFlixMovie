import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import GridLoader from "react-spinners/GridLoader";
import { RiAddBoxFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
function Category_Movie() {
    const { slug_country } = useParams()
    // console.log(slug_country);
    const [PartSeriesMovie, setPartSeriesMovie] = useState([])
    const [CurrentPage, setCurrentPage] = useState([])
    const [Time_spinner, setTime_spinner] = useState(true)
    const [Title_Country, setTitle_Country] = useState('')
    const [Page, setPage] = useState(1)
    const [SaveMovie, setSaveMovie] = useState([])
    let numberPage = []
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
    useEffect(() => {
        fetch(`https://phimapi.com/v1/api/quoc-gia/${slug_country}?page=${Page}&limit=18`)
            .then(res => res.json())
            .then(data => {
                setPartSeriesMovie(data.data.items)
                console.log(data.data);
                setTitle_Country(data.data.titlePage)
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
                        <h2 className='uppercase mt-10 font-bold text-white pl-[75px] flex gap-1'> Quốc Gia - {Title_Country} </h2>
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
                                        <div>
                                            <RiAddBoxFill onClick={(e) => handleAddMovie(item.slug)} className='absolute top-[-4px] left-2 hidden group-hover:block size-8 text-white' />
                                        </div>
                                        <div>
                                            <FaRegHeart className='absolute bottom-0 left-3 hidden group-hover:block size-6 text-white' />
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
                                <button className={`w-[45px] h-[33px] rounded-sm bg-yellow-400 mb-2 font-bold hover:bg-yellow-500`} data-index={item} onClick={(e) => handleCheckPage(e)}>{item} </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Category_Movie