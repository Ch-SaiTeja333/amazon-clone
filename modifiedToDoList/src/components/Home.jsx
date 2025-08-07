import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div className='container'>
      <nav className='navbar'>
        <li className='nav-item list-unstyled box-shadow'>
            <Link to='addtodo' className='text-decoration-none box-shadow fw-bold ' >Add New User</Link>
        </li>
        <li className='nav-item list-unstyled box-shadow'>
            <Link to='displaytodos' className='text-decoration-none fw-bold ' >Display Users</Link>
        </li>
        <li className='nav-item list-unstyled box-shadow'>
            <Link to='todoscount' className='text-decoration-none fw-bold ' >Users Count</Link>
        </li>
      </nav>
    </div>
  )
}

export default Home
