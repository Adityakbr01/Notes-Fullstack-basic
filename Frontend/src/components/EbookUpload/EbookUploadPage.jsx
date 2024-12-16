import React, { useState } from "react";
import axios from "axios";
import { ebookURl } from "../../API/endPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EbookUploadPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    pdfFile: null,
    description: "",
    language: "",
    price: "",
  });
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("image", formData.image);
    uploadData.append("pdfFile", formData.pdfFile);
    uploadData.append("description", formData.description);
    uploadData.append("language", formData.language);
    uploadData.append("price", formData.price);
  
    // Start Progress Increment Function
    const startLoader = () => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 5; // Increment progress by 5%
          } else {
            clearInterval(timer); // Stop incrementing once it reaches 90%
            return prev;
          }
        });
      }, 100); // 100ms delay for each increment
    };
  
    startLoader();
  
    try {
      const response = await axios.post(
        `${ebookURl}add`,
        uploadData,
        {
          withCredentials: true, // Enables cookies and credentials
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Set progress to 100% when the upload is complete
      setProgress(100);
      toast.success("Ebook uploaded successfully!");
      navigate("/")

      // Reset form and progress
      setFormData({
        name: "",
        image: null,
        pdfFile: null,
        description: "",
        language: "",
        price: "",
      });
      setProgress(0); // Reset progress bar
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      toast.error("Ebook uploaded Error!");
      setProgress(0); // Reset progress bar on error
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Upload eBook
        </h1>
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="w-full mb-4 bg-gray-200 rounded-full">
            <div
              className="h-4 text-xs font-medium text-center text-white bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ebook Name"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Cover Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md"
              accept="image/*"
              required
            />
          </div>

          {/* PDF File */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              PDF File Less then 10mb
            </label>
            <input
              type="file"
              name="pdfFile"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md"
              accept=".pdf"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write a brief description..."
              required
            ></textarea>
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Language
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., English"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 499"
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload eBook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EbookUploadPage;
