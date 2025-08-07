import React from 'react'
import { Outlet } from 'react-router'
import Home from './Home'
function Rootlayout() {
  return (
    <div>
       <Home></Home>
       <Outlet></Outlet>
    </div>
  )
}

export default Rootlayout
