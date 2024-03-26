import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
  return (
    <>
      <div className="max-w-lg mx-auto ">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-3">
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
            alt="user"
            className="rounded-full w-15 h-15 object-cover self-center cursor-pointer my-7"
          />
          <p className="text-center">
            {fileUploadError ? (
              <span className="text-red-700">Error Image Upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading {filePerc}% `}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 ">Successfully Uploaded!</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="border p-3 rounded-md "
            defaultValue={currentUser.username}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="border p-3 rounded-md "
            defaultValue={currentUser.email}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="border p-3 rounded-md "
          />
          <button
            type="submit"
            className="bg-slate-500 p-2 rounded-md text-white hover:opacity-95">
            Update
          </button>
        </form>
        <div className="flex justify-between my-2">
          <span className="text-red-600 cursor-pointer">Delete Account</span>
          <span className="text-red-600 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </>
  );
}
