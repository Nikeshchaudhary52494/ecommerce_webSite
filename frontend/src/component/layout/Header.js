import React, { useEffect, useState } from "react";
import SignINNavbar from "./SignInNavbar";
import NavOptions from "./NavOptions.js";
import SearchBar from "../layout/SearchBar.js"
import { Link } from "react-router-dom";
import Logo from "../images/byte.png"

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  // AiOutlineSearch,
} from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const handleScroll = (event) => {
      if (toggle) {
        event.preventDefault();
      }
    };

    // Add event listener when the component mounts
    document.body.addEventListener("wheel", handleScroll, { passive: false });

    // Remove event listener when the component unmounts
    return () => {
      document.body.removeEventListener("wheel", handleScroll);
    };
  }, [toggle]);
  return (
    <>
      <nav class="bg-slate-200 dark:bg-slate-800 dark:text-white sticky  top-0 z-10">
        <div class="lg:w-full w-3/4 mx-auto">
          <div class="max-w-5xl p-4 mx-auto flex justify-between items-center ">
            {/* <div class="text-3xl font-bold text-cyan-500 cursor-pointer">
              ECOMMERCE
            </div> */}
        
             <img className="w-24" src={Logo} />
            <div class=" hidden md:block ">
              <SearchBar />
            </div>

            <Link to="/user/signup">
              <div class="flex items-center text-xl  cursor-pointer">
                <AiOutlineUser />
                <span> sign in</span>
                <RiArrowDropDownLine />
                <SignINNavbar />
              </div>
            </Link>

            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              class="text-2xl lg:hidden  cursor-pointer"
            />

            {/* Navigation bar for Larger screen */}
            <ul class=" hidden lg:flex gap-5 ">
              <NavOptions toggle={toggle} setToggle={setToggle} />
            </ul>

            {/* SideBar(Navigation) for Small screen */}

            <div className={`inset-0 fixed bg-black backdrop-filter bg-opacity-50 backdrop-blur-md ${toggle ? `block` : `hidden`}`}>
              <ul
                class={` lg:hidden flex flex-col gap-7 w-[270px] h-[300px] rounded-[20px] pl-4 pt-10 fixed bg-cyan-500 dark:bg-slate-800 text-white dark:text-slate-300 top-4 right-4 
          ${toggle ? `right-4 top-4` : `right-[-100%] top-[-100%]`}
          `}
              >
                <AiOutlineClose
                  onClick={() => setToggle(!toggle)}
                  class="text-2xl fixed right-[50px]"
                />
                <NavOptions toggle={toggle} setToggle={setToggle} />
              </ul>
            </div>
          </div>
        </div>
        <div class="md:hidden  pb-4 ">
          <SearchBar />
        </div>

      </nav>

    </>
  );
};

export default Header;
