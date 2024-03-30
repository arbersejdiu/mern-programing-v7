import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);

          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <>
      <div>
        {loading && <p className="text-center my-10 text-1xl">loading...</p>}
        {error && (
          <p className="text-center my-10 text-1xl text-red-500">
            Something went wrong
          </p>
        )}

        {listing && !loading && !error && (
          <div className="border">
            <Swiper navigation className="">
              {listing.imageUrls.map(url => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[450px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex flex-col max-w-7xl mx-auto p-3 gap-6 my-7 text-slate-700">
              <p className="text-2xl font-semibold">
                {listing.name} - ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>
              <p className="flex gap-2 items-center  ">
                <span>
                  <FaMapMarkerAlt className="text-slate-700" />
                </span>
                <span>{listing.address}</span>
              </p>
              <div className="flex gap-2">
                <p className="bg-[#4c2aa382] w-max p-2 rounded-md text-white">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-red-800 w-max p-2 rounded-md text-white">
                    ${+listing.regularPrice - +listing.discountPrice} Discount
                  </p>
                )}
              </div>
              <p>
                <span className="font-semibold">Description - </span>{" "}
                {listing.description}
              </p>
              <ul className="flex gap-4 flex-wrap sm:gap-6 font-normal items-center">
                <li className="flex gap-2 items-center">
                  <FaBed />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="flex gap-2 items-center">
                  <FaBath />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex gap-2 items-center">
                  <FaParking />
                  {listing.parking ? `Parking spot` : `No Parking`}
                </li>
                <li className="flex gap-2 items-center">
                  <FaChair />
                  {listing.furnished ? `Furnished` : `unFurnished`}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
