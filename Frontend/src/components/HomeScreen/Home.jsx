import React, { useEffect } from 'react'
import TopSection from "./TopSection"
import Navbar from '../Navbar/Navbar'
import MiddleSection from './middleSection'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../features/mydata/dataSlice';


function Home() {

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.data);
  // Accessing profile state from Redux
  const { profile, loading, error } = useSelector((state) => state.Profile || {});
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Navbar profile={profile}/>
      <div className='w-[92%] h-full'>
      <TopSection />
      <MiddleSection data={items}/>
      
      </div>
     
    </div>
  )
}

export default Home