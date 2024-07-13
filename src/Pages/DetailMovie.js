import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Navbar from '../Component/Navbar';
import { handleGetDetailMovie } from '../Service';
function Movie() {
  const { slug } = useParams()
  const [Movie, SetMovie] = useState([])
  useEffect(() => {
    const CallPageCountry = async () => {
      const data = await handleGetDetailMovie(slug)
      // console.log(data.episodes[0].server_data);
      SetMovie([data.movie])
    }
    CallPageCountry()
  }, [])

  return (

    <div className={`${!Movie.length ? 'w-full h-screen bg-slate-800' : 'w-full h-full bg-slate-800'} `}>
      {Movie.map((item, index) => (
        <div key={index}>
          <div>
            <div className='relative lg:pl-[75px] pt-5 pl-7'>
              <img className='rounded-sm w-[93%] h-96 object-cover ' src={item.poster_url} />

              <h3 className='absolute top-60 text-white text-4xl ml-5 font-bold uppercase shadow-zinc-600 '>{item.name}</h3>
              <div className='absolute top-80 ml-5 flex items-center'>
                <a className='bg-rose-500 hover:bg-rose-600 transition ease-in-out 1s rounded-sm w-[100px] h-[35px] text-white flex items-center justify-center' href={'/watchMovie/' + item.slug}>Xem Ngay</a>
                <span className='bg-cyan-600 w-[60px] h-7 rounded-sm ml-3 cursor-pointer flex items-center justify-center'>2024</span>
              </div>
            </div>
          </div>
          <div className='lg:pl-[75px] mt-6 pl-7'>
            <h2 className='font-bold text-yellow-500 text-xl'>Nội Dung</h2>
            <p className='text-white text-lg font-bold text-justify w-[93%]'>{item.content}</p>
            <div className='font-bold text-yellow-500 text-xl mt-3 flex'>Quốc Gia : <span className='text-xl text-white ml-2'>{item.country[0].name}</span></div>
            <div className='font-bold text-yellow-500 text-xl mt-3 flex'>Thời Gian : <span className='text-xl text-white ml-2'>73 Phút</span></div>
            <ul className='font-bold text-yellow-500 text-xl mt-3 '>Đạo Diễn
              <li className='text-xl text-white ml-2'>- {item.director}</li>
            </ul>
            <ul className='font-bold text-yellow-500 text-xl mt-3 '>Diễn Viên
              {item.actor.map((actor, index) => (
                <li key={index} className='text-xl text-white ml-2'>- {actor}</li>
              ))}

            </ul>
            <ul className='font-bold text-yellow-500 text-xl mt-3 '>Thể Loại
              {item.category.map((cate, index) => (
                <li key={index} className='text-xl text-white ml-2'>- {cate.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Movie