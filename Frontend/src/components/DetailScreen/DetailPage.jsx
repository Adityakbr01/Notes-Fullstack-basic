import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ebookURl } from "../../API/endPoints";

function DetailPage() {
  const { id } = useParams(); // Extract the `id` from the URL parameters
  const [ebook, setEbook] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchEbookDetails = async () => {
      try {
        const response = await axios.get(`${ebookURl}${id}`);
        setEbook(response.data); // Set the fetched data in the state
        setLoading(false); // Turn off loading
      } catch (err) {
        setError("Failed to load ebook details.");
        setLoading(false);
      }
    };

    fetchEbookDetails(); // Call the fetch function
  }, [id]); // Dependency array includes `id` so it re-fetches if `id` changes


  return (
    <div className="max-w-4xl px-6 py-10 mx-auto">
      
          <a href={`${ebookURl}download/${id}`}>
          Download PDF</a>
      
    
    </div>
  );
}

export default DetailPage;
