// import { useState } from "react"
// const [SaveMovie, setSaveMovie] = useState([])
const handleAddMovie = async (slug) => {
    fetch(`https://phimapi.com/phim/${slug}`)
        .then(res => res.json())
        .then(data => {
            const item = []
            // item.concat(data)
            console.log(...item.concat(data));
            // setSaveMovie(prev => prev.concat(data))
            // if (data.length > 0) {
            //    const item_local = localStorage.setItem('MovieSave', JSON.stringify(data))
            //     // toast.success('Lưu Thành Công')
            //     alert('Lưu Thành Công')
            //     return item_local
            // }

        })
}
export default handleAddMovie