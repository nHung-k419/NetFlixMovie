import React, { useEffect, useState } from 'react';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slider_header({ props }) {
    const {Toogle } = props
    const [PostTer, setPostTer] = useState([])
    useEffect(() => {
        fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat`)
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setPostTer(data.items)
                }, 1000)
            })
    },[])
    var settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    // $('.autoplay').slick({
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    // })
    return (
        <Slider {...settings}>
            {PostTer.map((item, index) => (
                <div key={index} className={`${Toogle ? 'opacity-20' : ''}`}>
                    <div className='relative lg:pl-[75px] lg:pt-5 mt-7'>
                        <img className='lg:rounded-sm lg:w-[93%] lg:h-[450px] lg:object-cover w-[100%] h-[100%]' src={item.thumb_url} />
                        {/* <div className='absolute w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center top-44 cursor-pointer hover:bg-slate-800'>
                            <div className=''><GrPrevious className='text-white ' /></div>
                        </div> */}
                        {/* <div className='absolute w-10 h-10 bg-neutral-700 rounded-full flex items-center text-white justify-start  cursor-pointer hover:bg-slate-800'>
                            <div ><GrNext className=' flex justify-end' /></div>
                        </div> */}
                        <h3 className='absolute lg:top-60 top-28 text-white lg:text-4xl ml-5 font-bold uppercase shadow-zinc-600 '>{item.name}</h3>
                        <div className='absolute lg:top-80 ml-5 flex items-center top-36'>
                            <a className=' bg-rose-500 hover:bg-rose-600 transition ease-in-out 1s rounded-sm w-[100px] h-[35px] text-white flex items-center justify-center' href={`/infoMovie/${item.slug}`}>Xem Ngay</a>
                            <div className='bg-cyan-600 w-[60px] h-7 rounded-sm ml-3 cursor-pointer flex items-center justify-center'>{item.year}</div>
                        </div>
                    </div>
                </div>
            ))}

        </Slider>
    )
}

export default Slider_header