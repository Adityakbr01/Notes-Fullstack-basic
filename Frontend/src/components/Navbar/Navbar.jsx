import React, { useEffect, useState } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { RiMoonClearLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { rootURl } from "../../API/endPoints";
import {toast} from "react-hot-toast"


function Navbar({profile}) {
  const [isOpen, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const toggleState = useSelector((state) => state.toggle);


  // Manage scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Initialize theme state directly from localStorage
  const [isTheme, setIsTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "true"; // Convert string to boolean
  });

  // Update localStorage and apply theme styles whenever `isTheme` changes
  useEffect(() => {
    localStorage.setItem("theme", isTheme.toString());
    document.body.style.background = isTheme ? "#333333" : "#E0E0E0";
    document.body.style.color = isTheme ? "#fff" : "#0C0C0C";
  }, [isTheme]);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);


  const logout = async () => {
    try {
      // GET request to the logout endpoint
      const response = await axios.get(`${rootURl}logout`, {
        withCredentials: true, // Include cookies if necessary
      });
      console.log('Logout successful:', response.data);
      toast.success("Logged out successfully!");
      toast.success("Refresh the page!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
     
    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message);
    }
  };

  return (
    <nav
      className={`flex w-[100%] px-[5%] fixed z-[1000] left-1/2 -translate-x-1/2 top-0 py-1 md:py-3 mx-auto justify-between items-center transition-transform duration-300 ${
        visible ? "translate-y-0" : "md:-translate-y-[20vh]"
      } ${prevScrollPos >= 45 && "bg-black opacity-72 text-white"}`}
    >
      <div className="flex items-center gap-2 left">
        <div className="flex items-center w-6 h-6">
          <img
            className="w-full"
            src="favicon2.ico"
            alt="Logo"
          />
        </div>
        <h3 className="flex items-center font-medium cursor-pointer font-Neue">
          CodeWithCoder
        </h3>
      </div>
      <div className="hidden right md:flex">
        <ul className="flex items-center gap-6 text-sm font-light font-Neue">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Notes</li>
          {profile ? <li onClick={logout} className="px-1 py-1 text-base rounded-sm cursor-pointer text-btn-font bg-btn font-Helvetica">
           Log Out
          </li> : <li className="px-1 py-1 text-base rounded-sm cursor-pointer text-btn-font bg-btn font-Helvetica">
            <NavLink to={"/register"}>Sign in</NavLink>
          </li>}
          <li
            onClick={() => setIsTheme((prev) => !prev)}
            className={`relative px-8 py-3 text-base border ${
              isTheme ? "border-white" : "border-black"
            } ${prevScrollPos > 45 && "border-white"} rounded-full cursor-pointer font-Helvetica`}
          >
            <div
              className={`absolute w-6 h-6 top-1/2 -translate-y-1/2 flex items-center justify-center ${
                isTheme ? "bg-white" : "bg-black"
              } rounded-full transition-all duration-300 ease-in-out ${
                isTheme ? "right-0" : "right-[62%]"
              }`}
            >
              {isTheme ? (
                <RiMoonClearLine className="text-[#2bd1ff]" />
              ) : (
                <MdOutlineWbSunny className="text-[#ffdd35]" />
              )}
            </div>
          </li>
        </ul>
      </div>
      <div
        className={`relative z-50 block md:hidden ${
          isOpen || isTheme ? "text-white" : "text-black"
        }`}
        // onClick={() => setOpen((prev) => !prev)}
      >
        <Hamburger size={22} toggled={isOpen} toggle={setOpen} />
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute md:hidden ${
          isOpen ? "right-0" : "right-[-100%]"
        } w-full h-screen bg-[#0C0C0C] text-white top-0 transition-all duration-300 ease-in-out`}
      >
        <div className="w-full p-6 border-b border-white">
          <h1 className="text-2xl font-Neue">Menu</h1>
        </div>
        <ul className="flex flex-col items-start gap-6 p-8 text-2xl font-light opacity-70 font-Neue">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Notes</li>
         {profile ? <li onClick={logout} className="cursor-pointer">Log Out</li> :  <li className="cursor-pointer">Sign in</li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
