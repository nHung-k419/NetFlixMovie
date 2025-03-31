import { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import Slider_header from "./Component/Slider";
import Home from "./Pages/Home";
import { Route, Routes, useNavigate } from 'react-router-dom'
import DetailMovie from "./Pages/DetailMovie.js";
import { PublicRoutes } from './Routes/index.js'
import DefaultLayout from "./Component/Layout/DefaultLayout/index.js";
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [Toogle, setToogle] = useState('')
  const [getLocalStorage, setgetLocalStorage] = useState(() => {
    const MovieSaves = localStorage.getItem('MovieSave')
    return JSON.parse(MovieSaves)
})
  const toggle = (toogle) => {
    setToogle(toogle)
  }
  return (
    <div className="w-[99%] h-full bg-slate-800">
      <Routes>
        {PublicRoutes.map((route, index) => {
          // const Layout = route.layout === null ? Fragment : DefaultLayout
          // Default Layout is Default Layou
          let Layout = DefaultLayout
          // if layout is exits then this Layout = route.layout 
          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page toggle = {toggle} Toogle = {Toogle} getLocalStorage = {getLocalStorage} />
                </Layout>} />)
        })}
      </Routes>
    </div>
  );
}

export default App;
