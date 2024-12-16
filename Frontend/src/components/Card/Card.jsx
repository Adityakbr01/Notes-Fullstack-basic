import React from "react";
import { ebookURl } from "../../API/endPoints";
import { NavLink } from "react-router-dom";
function Card({ item }) {
  const { description, image, name, language, price, _id } = item;
  return (
    <div className="flex flex-col items-center justify-center gap-4 card-container max-h-[28.5rem] max-w-72 min-h-[28rem]">
      {/* Card */}
      <div className="flex flex-col h-auto max-w-sm overflow-hidden bg-black rounded-lg card">
        {/* Image Container */}
        <div className="img-container">
          <img
            className="w-full h-[200px] object-cover"
            src={
              image
                ? image
                : "https://ik.imagekit.io/sheryians/courses_gif/Front-End_Domination__Create_Anything_with_Code-FRONTENDTHUBNAIL_Wf8WqcNJx.jpg"
            }
            alt="Course Thumbnail"
          />
        </div>

        {/* Info Container */}
        <div className="flex flex-col gap-4 p-4 info-container">
          <h2 className="text-xl font-semibold text-white text-wrap">
            {name
              ? name.split(" ").length >= 4
                ? name.split(" ").slice(0, 8).join(" ") + "..."
                : name
              : "Notes"}
          </h2>
          <p className="w-24 h-6 text-center bg-[#2C2C2C] text-white rounded-sm">
            {language ? language : "Hindi"}
          </p>
          <div className="flex items-center justify-between text-white sm:flex-row">
            <div className="left">
              <p className="text-sm text-[#24CFA6]">Limited Time Discount</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  ₹ {price ? price : "4999"}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹ {price ? price * 2 : "999"}
                </span>
              </div>
            </div>
            <div className="mt-4 right sm:mt-0">
              <p className="px-2 text-base font-semibold text-black bg-white">
                50% OFF
              </p>
            </div>
          </div>
        </div>
        {/* View Details Button */}
        <hr />
        <NavLink
          to={`ebook/${_id}`}
          className="w-full py-3 text-center text-white bg-black rounded-md"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
}

export default Card;
