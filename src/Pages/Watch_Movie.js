import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader";
import { handleWatchMovie } from '../Service';

function Watch_Movie() {
    const { watch } = useParams()
    const [WatchMovie, setWatchMovie] = useState([])
    const [NameMovie, setNameMovie] = useState([])
    const [PartMovie, setPartMovie] = useState([])
    const [checkSlug, setCheckSlug] = useState([])
    const [seriesMovie, setcheckseriesMovie] = useState(false)
    const [Time_spinner, setTime_spinner] = useState(true)
    const handlecheckData = (e) => {
        for (let i = 0; i < checkSlug.length; i++) {
            if (e.target.dataset.slug === checkSlug[i].slug) {
                setcheckseriesMovie(checkSlug[i].link_embed)
            }
        }
    }
    useEffect(() => {
        const WatchPage = async () => {
            const data = await handleWatchMovie(watch)
            setTime_spinner(true)
            setNameMovie(data.movie)
            setPartMovie(data.episodes[0].server_data)
            setWatchMovie(data.episodes[0].server_data[0].link_embed)
            setCheckSlug(data.episodes[0].server_data)
            setTimeout(() => {
                setTime_spinner(false)
            }, 1000)
        }
        WatchPage()
    }, [watch])

    return (
        <div className={`w-full bg-slate-800 ${PartMovie.length <= 14 ? 'lg:h-screen h-screen' : 'lg:h-full h-full'}`}>
            {Time_spinner ? <div className='flex justify-center h-screen items-center'>
                <HashLoader color='#36d7b7' />
            </div> : <div>
                <div>
                    <h1 className='lg:pl-[75px] pl-7 mt-5 text-3xl font-bold text-white'>{NameMovie.name}</h1>
                    <div className='mt-10 '>
                        {seriesMovie ? <iframe className='lg:pl-[75px] pl-2 lg:w-[94%] lg:h-[550px] w-[290px] h-[150px]' src={seriesMovie} allow='fullscreen'></iframe> : <iframe className='lg:pl-[75px] pl-2 w-[94%] h-[550px]' src={WatchMovie} allow='fullscreen'></iframe>}
                    </div>
                </div>
                <div className='pl-[60px] w-[95%] flex flex-wrap '>
                    {PartMovie.map((part, index) => (
                        <button key={index} className={`bg-yellow-400 lg:w-[90px] w-[60px] lg:h-[40px] h-[40px] rounded-md mt-5 lg:ml-4 ml-1 font-bold hover:bg-yellow-500 mb-5
                         ${part.link_embed === seriesMovie ? 'bg-blue-400 ' : 'bg-yellow-400'} `} data-slug={part.slug} onClick={(e) => handlecheckData(e)}>{part.name}</button>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Watch_Movie