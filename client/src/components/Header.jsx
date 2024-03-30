import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { useSelector } from "react-redux";
import Logo from "../images/logo-final.png";
import { FaSearch } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
// import { BellSolid, EyeSolid } from "flowbite-svelte-icons";

import { useDispatch } from "react-redux";
import {
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice.js";
import { useEffect, useState } from "react";
export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOutheader = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className=" shadow-sm ">
      {/* bg-indigo-50 */}
      <header className="flex justify-between	items-center max-w-7xl mx-auto p-3">
        <Link to={"/home"}>
          <h1>
            <img src={Logo} alt="" className="max-w-[170px]" />
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 pl-3 rounded-md items-center hidden sm:flex ">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="bg-[#4c2aa382] p-3 rounded-r-md cursor-pointer">
            <FaSearch className="text-white" />
          </span>
        </form>
        <ul className="flex gap-4 items-center justify-end">
          <Link to="/home">
            <li className="hidden sm:inline text-slate-700 hover:underline font-semibold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline font-semibold">
              About
            </li>
          </Link>

          <Link to="/profile" className="">
            {currentUser ? (
              <div className="relative">
                <FaUser className="mr-3 h-4 w-4 text-white absolute right-1 bottom-2.5" />
                <Dropdown
                  class="!bg-[#4c2aa382] text-white rounded-md pr-6"
                  label="My Account"
                  arrowIcon={false}>
                  <div className="flex justify-center items-center">
                    <div className="px-4 pt-2 w-max">
                      <img
                        src={currentUser.avatar}
                        alt="photo"
                        className="rounded-full w-11 h-11 object-cover border"
                      />
                    </div>
                    <div slot="header" class="py-2 pr-7 w-max">
                      <span class="block text-sm text-gray-900 dark:text-white">
                        {currentUser.username}
                      </span>
                      <span class="block truncate text-sm font-medium">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                  <Link to="/dashboard">
                    <Dropdown.Item class="font-semibold text-center px-4 p-2">
                      <span class="block truncate text-sm font-medium">
                        Dashboard
                      </span>
                    </Dropdown.Item>
                  </Link>
                  <Link to="/profile">
                    <Dropdown.Item class="font-semibold text-center px-4 p-2">
                      <span class="block truncate text-sm font-medium">
                        Settings
                      </span>
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item class="font-semibold text-center px-4 p-2">
                    <span
                      onClick={handleSignOutheader}
                      class="block truncate text-sm font-medium">
                      Sign Out
                    </span>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            ) : (
              <li className="">
                <button className="  p-2 rounded-md bg-[#4c2aa382] hover:opacity-95 text-white">
                  Sign In
                </button>
              </li>
            )}
          </Link>
        </ul>
      </header>
    </div>
  );
}
