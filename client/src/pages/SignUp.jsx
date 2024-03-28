import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto pt-24 p-3">
        <h1 className="text-center text-3xl font-semibold my-7 text-slate-700">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="username"
            className="border p-2 rounded-md focus:outline-none"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 my-4">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="font-semibold text-[#4c2aa382]">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}
