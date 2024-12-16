import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import TopSection from './Projects/TopSection';

function ButtomSection({ data }) {
  const [selectedCategory, setSelectedCategory] = useState('Latest'); // Add state for selected category
  const [filteredData, setFilteredData] = useState([]); // Initialize filtered data as an empty array

  // Function to handle category selection
  const handleCategoryChange = (category = "Latest") => {
    setSelectedCategory(category);

    // Example filter logic based on category:
    if (category === 'Latest') {
      setFilteredData([...data].reverse().slice(data/2,5)); // Adjust this logic as per your data
    } else if (category === 'Trending') {
      setFilteredData(data.slice(0, 10)); // Adjust logic for trending
    } else if (category === 'DSA') {
      setFilteredData(data.filter(item => item.name.includes('DSA'))); // Filter based on 'name' containing 'DSA'
    } else if (category === 'Interview') {
      setFilteredData(data.filter(item => item.name.includes('Interview'))); // Filter based on 'name' containing 'Interview'
    }
  };

  useEffect(() => {
    // Set initial data to 'Latest' on mount
    handleCategoryChange('Latest');
  }, [data]); // Only run this effect when the 'data' prop changes

  return (
    <div className='flex flex-col items-start w-full gap-5'>
      <div className="flex flex-col flex-wrap justify-start gap-6 top-Container">
        <h2 className='text-base font-medium md:text-xl'>Category :</h2>
        <ul className="flex flex-wrap items-start justify-start gap-4">
          {/* Categories */}
          <li
            onClick={() => handleCategoryChange('Latest')}
            className={`shine px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Latest' ? 'bg-blue-600' : ''}`}
          >
            Latest
          </li>
          <li
            onClick={() => handleCategoryChange('Trending')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Trending' ? 'bg-blue-600' : ''}`}
          >
            Trending
          </li>
          <li
            onClick={() => handleCategoryChange('DSA')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'DSA' ? 'bg-blue-600' : ''}`}
          >
            DSA
          </li>
          <li
            onClick={() => handleCategoryChange('Interview')}
            className={`shine  px-6 py-1 text-center text-white transition-all transform bg-black rounded-full shadow-md cursor-pointer font-Neue ${selectedCategory === 'Interview' ? 'bg-blue-600' : ''}`}
          >
            Interview
          </li>
        </ul>
      </div>
<div className='flex items-center justify-center w-full md:items-start'>

<div className="grid items-center justify-center grid-cols-1 gap-4 Middle-Container sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {/* Display filtered data */}
        {filteredData.map((item, index) => (
          <Card key={index} item={item} />
        ))}

       
      </div>
  
</div>
      <TopSection />
    </div>
  );
}

export default ButtomSection;
