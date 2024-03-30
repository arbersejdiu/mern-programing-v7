import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = e => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2 border p-2">
          <p>
            Contact
            <span className="font-semibold"> {landlord.username} </span>
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            onChange={onChange}
            placeholder="Enter message here..."
            value={message}
            className="w-full border p-3 rounded-md focus:outline-none"></textarea>
          <Link
            className="bg-[#4c2aa382] text-white text-center p-2 rounded-md"
            to={`mailto:${landlord.email}?subject=Regarging ${listing.name}&body=${message}`}>
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
