import React, { useState } from 'react'

function TopSection() {
    const [selectedCategory,setselectedCategory] =useState(null)
  return (
    <div className='w-full h-screen'>
      <div className="flex flex-col flex-wrap justify-start gap-6 top-Container">
        <h2 className='text-base font-medium md:text-xl'>Projects :</h2>
        <ul className="flex flex-wrap items-start justify-start gap-4">
          {/* Categories */}
          <li
            // onClick={() => handleCategoryChange('Latest')}
            className={`shine px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Latest' ? 'bg-blue-600' : ''}`}
          >
            Latest
          </li>
          <li
            // onClick={() => handleCategoryChange('Trending')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Trending' ? 'bg-blue-600' : ''}`}
          >
            Java
          </li>
          <li
            // onClick={() => handleCategoryChange('DSA')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'DSA' ? 'bg-blue-600' : ''}`}
          >
            C
          </li>
          <li
            // onClick={() => handleCategoryChange('Interview')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Interview' ? 'bg-blue-600' : ''}`}
          >
            C++
          </li>
          <li
            // onClick={() => handleCategoryChange('Interview')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Interview' ? 'bg-blue-600' : ''}`}
          >
            Python
          </li>
          <li
            // onClick={() => handleCategoryChange('Interview')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Interview' ? 'bg-blue-600' : ''}`}
          >
            JavaScript
          </li>
        </ul>
      </div>
      </div>
  )
}

export default TopSection