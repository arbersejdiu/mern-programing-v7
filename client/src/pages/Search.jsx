import React from "react";

export default function Search() {
  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto sm:flex-row ">
        <div className="border-b-2 sm:border-r-2 sm:border-b-0 sm:pr-7 sm:py-7 py-7 w-screen sm:max-w-fit  p-3">
          <form className=" md:max-w-screen">
            <div className="flex flex-row items-center gap-2 ">
              <label
                htmlFor="searchTerm"
                className="whitespace-nowrap font-medium">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border p-2 rounded-md w-full focus:outline-none items-center"
              />
            </div>
            <div className="flex gap-2 py-5 flex-wrap">
              <label className="font-medium">Type:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Rent && Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 py-5 flex-wrap">
              <label className="font-medium">Amenities:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="border p-2 rounded-md  focus:outline-none items-center w-5"
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium">Sort:</label>
              <select
                id="sort_order"
                className="border rounded-md p-3 focus:outline-none">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
            <button className="bg-[#4c2aa382] w-full p-2 text-white rounded-md my-5  cursor-pointer">
              Search
            </button>
          </form>
        </div>
        <div className="flex w-64 sm:pl-7 p-3 sm:py-7">
          <h1 className="font-medium ">Listing Results:</h1>
        </div>
      </div>
    </>
  );
}
