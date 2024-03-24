import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <>
      <div className="bg-[#4c2aa357] shadow-md">
        <header className="flex justify-between	items-center max-w-6xl mx-auto p-3">
          <h1>
            <img src={Logo} alt="" className="max-w-52 md:max-w-64" />
          </h1>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-500" />
          </form>
          <ul className="flex gap-4">
            <Link to="/home">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li className=" text-slate-700 hover:underline">Sign In</li>
            </Link>
          </ul>
        </header>
      </div>
    </>
  );
}
