import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice.js";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  // Firebase
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches("image/.*")

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
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(updateUserFailure());
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async e => {
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
  return (
    <>
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <div className="image-content self-center">
            <input
              onChange={e => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <span
              className="span flex justify-center items-center "
              onClick={() => fileRef.current.click()}>
              Edit
            </span>
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-2"
            />
          </div>

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-md focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="border p-3 rounded-md focus:outline-none"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border p-3 rounded-md focus:outline-none"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-[#4c2aa382] p-2 rounded-md text-white hover:opacity-95">
            {loading ? "Loading" : "Update"}
          </button>
        </form>
        <Link to={"/create-listing"}>
          <button className="bg-slate-700 p-2 rounded-md text-white hover:opacity-95 w-full mt-2">
            Add New Post
          </button>
        </Link>
        <div className="flex justify-between my-2">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer">
            Delete permanently account
          </span>
          <span onClick={handleSignOut} className="text-red-600 cursor-pointer">
            Sign Out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "Updated successfully" : ""}
        </p>
        <button onClick={handleShowListings} className="text-green-700">
          Show Listings
        </button>
        {showListingError ? (
          <p className="text-red-700 mt-5">Something went wrong</p>
        ) : (
          ""
        )}
        {userListings &&
          userListings.length > 0 &&
          userListings.map(listing => (
            <div
              key={listing._id}
              className="p-3 flex justify-between items-center my-5 border">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="Listing Cover"
                  className="w-24 h-24 object-contain"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold flex-1 truncate">
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col">
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">Edit</button>
                </Link>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
