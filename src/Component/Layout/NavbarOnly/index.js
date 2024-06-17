import React from 'react'
import Navbar from '../../Navbar'
function NavbarOnly({ children }) {
  // console.log(children.props);
  return (
    <div>
      <Navbar props={children.props} />
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

export default NavbarOnly