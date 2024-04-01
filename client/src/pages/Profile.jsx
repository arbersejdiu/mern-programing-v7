import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(userListings);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async file => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      error => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleListingDelete = async listingId => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings(prev =>
        prev.filter(listing => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    showListings();
  }, []);
  const showListings = async e => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
      setShowListingError(false);
    } catch (error) {
      setShowListingError(true);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-3">
        <header className="flex justify-between items-center w-full border-b ">
          <div className="flex justify-start items-center gap-2 py-2">
            <input
              onChange={e => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-14 w-14  sm:h-24 sm:w-24 object-cover cursor-pointer self-center mt-2 border-2"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{currentUser.username}</p>
              <p>{currentUser.email}</p>
            </div>
          </div>
          <div>
            <Link to={"/create-listing"}>
              <button className="bg-slate-500 p-1 sm:p-2 rounded-md text-white hover:opacity-95 w-full mt-2">
                +Add New Post
              </button>
            </Link>
          </div>
        </header>

        <div>
          {showListingError ? (
            <p className="text-red-700 mt-5">Something went wrong</p>
          ) : (
            ""
          )}
          {userListings.map(listing => (
            <div
              key={listing._id}
              className="flex justify-between items-center border gap-4 my-2 pr-5">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="Listing Cover"
                  className="w-32 h-32 object-cover"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold flex-1 truncate">
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-end gap-4 sm:flex-row sm:gap-4 ">
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="bg-green-700 text-white p-1 sm:p-2 rounded-md hover:opacity-95">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-white bg-red-700 p-1 sm:p-2  rounded-md hover:opacity-95 ">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
