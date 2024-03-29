import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function createListing() {
  const { currentUser } = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageSubmit = e => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploadError(false);
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then(urls => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(err => {
          setImageUploadError("Image upload Failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 7 images");
      setUploading(false);
    }
  };
  const storeImage = async file => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = index => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = e => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (+formData.regularPrice < formData.discountPrice) {
        return setError("Regular price must be greater than discount price");
      }
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      setLoading(false);
    } catch (error) {
      setError(data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-3">
        <h1 className="text-center font-semibold text-2xl py-7 text-slate-700">
          Create New Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={50}
              minLength={1}
              required
              onChange={handleChange}
              value={formData.name}
            />

            <input
              type="text"
              placeholder="Description"
              id="description"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={62}
              minLength={1}
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border p-3 rounded-md focus:outline-none"
              maxLength={62}
              minLength={1}
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
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
                  onChange={handleChange}
                  value={formData.bedrooms}
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
                  onChange={handleChange}
                  value={formData.bathrooms}
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
                  min="0"
                  max="99999999999"
                  className="p-3 border border-gray rounded-md"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div>
                  <p>Regular Price</p>
                  <span className="text-xs">($/Month)</span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="99999999999"
                    className="p-3 border border-gray rounded-md"
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div>
                    <p>Disount Price</p>
                    <span className="text-xs">($/Month)</span>
                  </div>
                </div>
              )}
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
                  onChange={e => setFiles(e.target.files)}
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  className="p-3 border rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  className="p-3 bg-[#4c2aa382] text-white rounded-md hover:opacity-95">
                  {uploading ? "Loading" : "Upload"}
                </button>
              </div>
              {imageUploadError && (
                <p className="text-red-500 text-sm">{imageUploadError}</p>
              )}
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between items-center border p-2">
                    <img
                      src={url}
                      alt="failed"
                      className="w-40 h-40 object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-700">
                      Delete
                    </button>
                  </div>
                ))}
              <button
                type="submit"
                disabled={loading || uploading}
                className="p-3 bg-[#4c2aa382] text-white rounded-md hover:opacity-95">
                {loading ? "Loading" : "Create Listing"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
