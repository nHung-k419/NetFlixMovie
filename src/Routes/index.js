import NavbarOnly from "../Component/Layout/NavbarOnly";

import Movie from "../Pages/Movie";
import Home from '../Pages/Home'
import Watch_Movie from "../Pages/Watch_Movie";
import Series_Movie from "../Pages/Series_Movie";
import Single_Movie from "../Pages/Single_Movie";
import Anime_Movie from "../Pages/Anime_Movie";
import TV_Shows from "../Pages/TV_Shows";
import Category_Movie from "../Pages/Category_Movie";
import Country_Movie from "../Pages/Country_Movie";
import Search_Movie from "../Pages/Search_Movie";
import SaveMovies from "../Pages/SaveMovies";
const PublicRoutes = [
    {path : '/', component: Home},
    {path : '/infoMovie/:slug', component: Movie, layout : NavbarOnly},
    {path : '/watchMovie/:watch', component: Watch_Movie, layout : NavbarOnly},
    {path : '/Series_Movie', component: Series_Movie, layout : NavbarOnly},
    {path : '/Single_Movie', component: Single_Movie, layout : NavbarOnly},
    {path : '/Anime_Movie', component: Anime_Movie, layout : NavbarOnly},
    {path : '/TV_Shows', component: TV_Shows, layout : NavbarOnly}, 
    {path : '/Category_Movie/:slug_cate', component: Category_Movie, layout : NavbarOnly},
    {path : '/Country_Movie/:slug_country', component: Country_Movie, layout : NavbarOnly},
    {path : '/Search_Movie/:slug_Search', component: Search_Movie, layout : NavbarOnly},
    {path : '/Save_Movies', component: SaveMovies, layout : NavbarOnly}
]
const PrivateRoutes = []
export {PublicRoutes,PrivateRoutes}