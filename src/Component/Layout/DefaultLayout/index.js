import React from 'react'
import Navbar from '../../Navbar'
import Slider_header from '../../Slider'
function DefaultLayout({ children }) {
  // console.log(children.props);
  return (
    <div>
      <Navbar props={children.props} />
      <Slider_header props={children.props} />
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout