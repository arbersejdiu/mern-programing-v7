import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBath, FaBed } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <>
      <Link to={`/listing/${listing._id}`}>
        <div className="bg-white rounded-md border shadow-sm hover:shadow-md transiton-shadow overflow-hidden w-full  sm:max-w-[312px] ">
          <img
            className="w-full sm:max-w-[320px] max-h-[240px] h-full object-cover hover:scale-105 transition-scale duration-300"
            src={
              listing.imageUrls[0] ||
              "https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D"
            }
            alt="image"
          />
          <div className="flex flex-col gap-2 p-2">
            <h1 className="truncate text-slate-700 font-medium">
              {listing.name}
            </h1>
            <div className="flex gap-2 items-center">
              <FaMapMarkerAlt className="w-4 h-4 text-green-700" />
              <p className="font-normal text-sm text-gray-700">
                {listing.address}
              </p>
            </div>
            <p className="font-normal text-sm  text-gray-700 line-clamp-2">
              {listing.description}
            </p>

            <p className="font-medium text-slate-700">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex gap-2 text-sm text-slate-700">
              <span className="flex gap-2 items-center">
                <FaBed />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </span>
              <span className="flex gap-2 items-center">
                <FaBath />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
