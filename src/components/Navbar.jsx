import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search, setsearch }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
 
  
  return (
    <div className="flex flex-col sm:flex-row  justify-between items-center p-4 shadow-sm">
      <div className="flex items-center gap-6">
        <Link to="/">
          <h1 className="text-2xl font-semibold cursor-pointer">
            <span className="text-indigo-700 font-bold">Employ</span>Wise
          </h1>
        </Link>
        <input
          type="text"
          placeholder="search user..."
          className="outline-0 border-[0.5px] border-gray-400 rounded-md p-2"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <a href="https://github.com/shelavalepallavi/employwise" target="_blank"><button className="flex items-center justify-between gap-1 bg-indigo-50 rounded-full ring-1 ring-indigo-700 px-2 py-1 hover:bg-indigo-100 cursor-pointer">
        <img src="/github.png" alt="github logo" className="  w-8" />
        <span className="text-indigo-700  font-bold">Github</span>
        </button></a>
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-indigo-800"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-indigo-800">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
