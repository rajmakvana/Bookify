import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useFirebase } from "../context/fireBase";
import { Link , useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const firebase = useFirebase();

  const handleLogout = async () => {
    await firebase.signOutUser();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-10 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaBookOpen className="text-yellow-300 text-3xl" />
          <Link to={"/"} className="text-xl font-bold text-gray-800">
            Bookify
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!firebase.isLoggedIn ? (
            <>
              <Link
                to={"/signin"}
                className="text-gray-800 hover:text-indigo-600 font-medium">
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/create-listing"}
                className="text-gray-700 hover:text-indigo-600 font-medium">
                Create Listing
              </Link>

              <Link
                to={"/show-listing"}
                className="text-gray-700 hover:text-indigo-600 font-medium">
                Show Listing
              </Link>

              <Link
                to={"/book/orders"}
                className="text-gray-700 hover:text-indigo-600 font-medium">
                Orders
              </Link>

              <Link
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RxCross2 size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <div className="flex flex-col space-y-2 px-4 py-3">
            {!firebase.isLoggedIn ? (
              <>
                <Link
                  to={"/signin"}
                  className="text-gray-700 text-left hover:text-indigo-600 max-w-[150px]">
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-left max-w-[100px]">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/create-listing"}
                  className="text-gray-700 text-left hover:text-indigo-600">
                  Create Listing
                </Link>

                <Link
                  to={"/show-listing"}
                  className="text-gray-700 hover:text-indigo-600 font-medium">
                  Show Listing
                </Link>

                <Link
                  to={"/book/orders"}
                  className="text-gray-700 hover:text-indigo-600 font-medium">
                  Orders
                </Link>

                <Link
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-left">
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
