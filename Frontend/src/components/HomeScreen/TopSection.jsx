import React from "react";

function TopSection() {
  return (
    <div className="flex items-center justify-center w-full h-full pt-20">
      <div className="container flex flex-col items-center justify-around h-full md:px-10 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col items-center w-full gap-8 text-center md:items-start left md:text-left md:w-1/2">
          <div className="w-full h-full">
            <h2 className="text-3xl font-bold font-Neue md:text-5xl md:text-wrap text-nowrap">Ace Exams <br /> & Boost <span className="">Grades</span> with <br /> Top-Quality Notes!</h2>
          </div>
          <div className="px-4 py-2 overflow-hidden text-xl text-white bg-black md:text-lg shine w-fit">
            <a href="/" className="e">Check Notes make an Impact</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full hidden md:flex md:w-[38%]">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src="./smilingGirl.png"
              alt="Smiling Girl"
              className="w-full md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSection;



//for grade color #6467F1
//for bg color #040B20