import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <>
      <div className="max-w-lg mx-auto ">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-3">
          <img
            src={currentUser.avatar}
            alt="user"
            className="rounded-full w-15 h-15 object-cover self-center cursor-pointer my-7"
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            className="border p-3 rounded-md "
            value={currentUser.username}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="border p-3 rounded-md "
            value={currentUser.email}
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
