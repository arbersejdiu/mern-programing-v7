import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="bg-[#4c2aa357] shadow-md">
      <header className="flex justify-between	items-center max-w-7xl mx-auto px-3">
        <Link to={"/home"}>
          <h1>
            <img src={Logo} alt="" className="max-w-[200px]" />
          </h1>
        </Link>
        {/* <form className="bg-slate-100 p-3 rounded-md flex items-center ">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form> */}
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

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="photo"
                className="rounded-full w-11 h-11 object-cover border"
              />
            ) : (
              <li className="">
                <button className="  p-2 rounded-md bg-slate-700 hover:opacity-95 text-white">
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
