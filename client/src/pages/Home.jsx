import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="">
      {/* top */}
      <div className="flex flex-col gap-5 py-10 h-[80vh] justify-center max-w-7xl mx-auto p-3">
        <h1 className="font-bold text-5xl sm:text-6xl text-[#4c2aa382] leading-[4.5rem]">
          Find you next <span className="text-slate-500">Perfect</span> <br />
          home to live
        </h1>
        <p className="text-slate-600 text-md sm:text-lg">
          Arber Real Estate will help to find your house fast and easy,
          <br />
          We believe in turning dreams into reality.
        </p>
        <Link to={"/search"}>
          <button className="bg-[#4c2aa382] hover:opacity-95 text-white p-2 rounded-md text-md sm:text-xl">
            homes
          </button>
        </Link>
      </div>

      {/* Swipper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map(listing => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Bottom */}
      <div className="flex flex-col gap-5 py-10 max-w-7xl mx-auto p-3">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="pb-5">
              <h2 className="font-semibold text-slate-700 text-2xl">
                Recent offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-green-700 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-5 py-10 max-w-7xl mx-auto p-3">
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="pb-5">
              <h2 className="font-semibold text-slate-700 text-2xl">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-green-700 hover:underline">
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-5 py-10 max-w-7xl mx-auto p-3">
        {saleListings && saleListings.length > 0 && (
          <div className="w-full">
            <div className="pb-5">
              <h2 className="font-semibold text-slate-700 text-2xl">
                Recent places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-green-700 hover:underline">
                Show more places for sale
              </Link>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              {saleListings.map(listing => (
                <ListingItem listing={listing} key={listing._id} className="" />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* {Footer} */}
      <footer>
        <p className="text-center py-4 text-slate-600">
          © 2023 Arber Real Estate “All Rights Reserved”
        </p>
      </footer>
    </div>
  );
}
