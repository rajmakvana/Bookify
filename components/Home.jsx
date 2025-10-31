import React from "react";
import { FaBookOpen, FaCloudUploadAlt, FaEdit, FaTrashAlt, FaDatabase } from "react-icons/fa";

const Home = () => {
  
  return (
    <div className="min-h-screen w-[85%] mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaBookOpen className="text-yellow-300 text-5xl" />
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            Bookify
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/90 mb-8">
          Upload and manage your favorite books easily!  
          Store book covers in Firebase Storage and perform CRUD operations — all from one place.
        </p>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-200">
          Sign Up for Free
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {/* Upload */}
          <div className="flex flex-col items-center">
            <FaCloudUploadAlt className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Books</h3>
            <p className="text-gray-600">
              Upload book covers and details directly to Firebase Storage.
            </p>
          </div>

          {/* Firebase */}
          <div className="flex flex-col items-center">
            <FaDatabase className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Firebase Integration</h3>
            <p className="text-gray-600">
              Store and retrieve books securely using Firebase Firestore.
            </p>
          </div>

          {/* Edit */}
          <div className="flex flex-col items-center">
            <FaEdit className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Edit Details</h3>
            <p className="text-gray-600">
              Update book titles, authors, and descriptions anytime.
            </p>
          </div>

          {/* Delete */}
          <div className="flex flex-col items-center">
            <FaTrashAlt className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Delete Books</h3>
            <p className="text-gray-600">
              Remove unwanted books from your collection in one click.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Start managing your books today
        </h2>
        <p className="text-white/90 mb-6">
          Sign up now and explore the easiest way to upload, edit, and organize your library.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
