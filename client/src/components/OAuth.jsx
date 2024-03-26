import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign with google", error);
    }
  };
  return (
    <div className="rounded-md flex items-center justify-center border-2 hover:opacity-95">
      <FcGoogle />
      <button
        type="button"
        onClick={handleGoogleClick}
        className=" text-dark p-2 capitalize rounded-md hover:opacity-95">
        Continue with google
      </button>
    </div>
  );
}
