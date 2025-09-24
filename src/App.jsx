import React from 'react'
import { Link } from 'react-router'

function App() {
  return (
    <div>
      <nav className='flex gap-2'>
        <a href="">Contact</a>
        <Link to="/posts">Posts</Link>
        <a href="">Blogs</a>
      </nav>
    </div>
  )
}

export default App
