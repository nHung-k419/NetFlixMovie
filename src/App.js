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
  // let Data_init
  // // const [Data_Cate_Child, setData_Cate_Child] = useState('hanh-dong')
  // // const [Data_Country_Child,setData_Country_Child] = useState('trung-quoc')
  // // // Use callback to transmission data from component childrent(Navbar) to component Parent(App)
  // // const handle_dataFrom_Children = (data) => {
  // //   // after will receive data from component Child(Navbar) to here
  // //   setData_Cate_Child(data)
  // //   // Data_init = data
  // // }
  // Use callback to transmission data from component childrent(Navbar) to component Parent(App)
  // const handle_dataCountryFrom_Children = (Country) => {
  //   // after will receive data from component Child(Navbar) to here
  //   setData_Country_Child(Country)
  // }

  // CallbackSearch 
  // const Navigate = useNavigate()
  // const [Value_Search, setValue_Search] = useState('')
  // const Search_Value_Children = (value_Search) => {
  //   setValue_Search(value_Search)
  //   if(Value_Search){
  //     Navigate('/Search_Movie'+123)
  //   }
  // console.log(value_Search);
  // }
  const toggle = (toogle) => {
    setToogle(toogle)
  }
  return (
    <div className="w-[100%] h-full bg-slate-800">
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
