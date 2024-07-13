import axios from 'axios'
// HOME 
export const handleGetSingleMovie = async () => {
    const SingleMovie = await axios.get('https://phimapi.com/v1/api/danh-sach/phim-le')
    return SingleMovie.data
}
export const handleGetSeriesMovie = async () => {
    const SeriesMovie = await axios.get('https://phimapi.com/v1/api/danh-sach/phim-bo')
    return SeriesMovie.data
}
export const handleGetAnimeMovie = async () => {
    const AnimeMovie = await axios.get('https://phimapi.com/v1/api/danh-sach/hoat-hinh')
    return AnimeMovie.data
}
export const handleGetTVshowMovie = async () => {
    const TVshowsMovie = await axios.get('https://phimapi.com/v1/api/danh-sach/tv-shows')
    return TVshowsMovie.data
}
// END HOME 

// SaveMovieLocalstorage
export const handleSavemovie = async (slug) => {
    if(slug !== ''){
        const SaveMovie = await axios.get(`https://phimapi.com/phim/${slug}`)
        return SaveMovie.data
    }
}

// Anime
export const handleGetPageAnime = async (Page) => {
    const PageAnime = await axios.get(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${Page}&limit=18`)
    return PageAnime.data
}

// Categories
export const handleGetPageCategories = async (slug_cate,Page) => {
    const PageCatrgories = await axios.get(`https://phimapi.com/v1/api/the-loai/${slug_cate}?page=${Page}&limit=18`)
    return PageCatrgories.data
}

// Country
export const handleGetPageCountry = async (slug_country,Page) => {
    const PageCountry = await axios.get(`https://phimapi.com/v1/api/quoc-gia/${slug_country}?page=${Page}&limit=18`)
    return PageCountry.data
}

// Search
export const handlleSearchPage = async (slug_Search) => {
    const PageSearch = await axios.get(`https://phimapi.com/v1/api/tim-kiem?keyword=${slug_Search}&limit=18`)
    return PageSearch.data
}

// Series Movie
export const handleGetPageSeries = async (Page) => {
    const PageSeries = await axios.get(`https://phimapi.com/v1/api/danh-sach/phim-bo?page=${Page}&limit=18`)
    return PageSeries.data
}

// Single Movie
export const handleGetPageSingle = async (Page) => {
    const PageSingle = await axios.get(`https://phimapi.com/v1/api/danh-sach/phim-le?page=${Page}&limit=24`)
    return PageSingle.data
}

// TV Shows
export const handleGetPageTvShows = async (Page) => {
    const PageTvShows = await axios.get(`https://phimapi.com/v1/api/danh-sach/tv-shows?page=${Page}&limit=18`)
    return PageTvShows.data
}

// Detail Movie
export const handleGetDetailMovie = async (slug) => {
    const PageDetail = await axios.get(`https://phimapi.com/phim/${slug}`)
    return PageDetail.data
}

// Watch Movie 
export const handleWatchMovie = async (watch) => {
    const WatchPage = await axios.get(`https://phimapi.com/phim/${watch}`)
    return WatchPage.data
}