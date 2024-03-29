import React from "react";

export default function createListing() {
  return (
    <>
      <div className="max-w-7xl mx-auto p-3">
        <h1 className="text-center font-semibold text-2xl py-7 text-slate-700">
          Create New Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={62}
              minLength={10}
              required
            />

            <input
              type="text"
              placeholder="Description"
              id="description"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={62}
              minLength={10}
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={62}
              minLength={10}
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="99"
                  className="p-3 border border-gray rounded-md "
                />
                <p>Beds</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="99"
                  className="p-3 border border-gray rounded-md"
                />
                <p>Baths</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1  gap-5">
            <div className="flex gap-3 flex-wrap">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="9999999"
                  className="p-3 border border-gray rounded-md"
                  required
                />
                <div>
                  <p>Regular Price</p>
                  <span className="text-xs">($/Month)</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="9999999"
                  className="p-3 border border-gray rounded-md"
                  required
                />
                <div>
                  <p>Disount Price</p>
                  <span className="text-xs">($/Month)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4 my-5">
              <p className="font-semibold text-slate-700">
                Images:
                <span className="font-normal text-[#4c2aa392]">
                  {"  "}
                  The first Image will be the cover
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  className="p-3 border rounded-md w-full"
                />
                <button className="p-3 bg-[#4c2aa382] text-white rounded-md hover:opacity-95">
                  Upload
                </button>
              </div>
              <button className="p-3 bg-[#4c2aa382] text-white rounded-md hover:opacity-95">
                Create Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
