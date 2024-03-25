import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
export default function SignIp() {
  const [formData, setformData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto my-7 p-3">
        <h1 className="text-center text-3xl font-semibold my-7 text-[#1D436E]">
          Sign In
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="border p-2 rounded-md focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border p-2 rounded-md focus:outline-none"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="border p-2 bg-[#4c2aa382] text-white rounded-md capitalize hover:opacity-95 disabled:opacity-80">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 my-4">
          <p>Dont have an account?</p>
          <Link to="/sign-up">
            <span className="font-semibold text-[#4c2aa382]">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}
