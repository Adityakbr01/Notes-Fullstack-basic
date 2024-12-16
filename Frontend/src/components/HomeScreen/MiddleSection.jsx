import React from 'react';
import Card from '../Card/Card'; // Assuming you have a Card component
import ButtomSection from './ButtomSection';

function MiddleSection({data}) {
  return (
    <div className="flex flex-wrap items-center justify-center w-full h-screen gap-3 mt-24 mb-40">
      {/* Responsive Grid Layout */}
      <div className="grid justify-center grid-cols-1 gap-4 items-centerll iten sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
        
      </div>
      <ButtomSection data={data}/>
     
    </div>
  );
}

export default MiddleSection;
