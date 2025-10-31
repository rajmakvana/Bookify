import React, { useState } from "react";
import { FaBook, FaHashtag, FaRupeeSign, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/fireBase";

const BookListingForm = () => {

  const firebase = useFirebase();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    title: "",
    isbnNumber: "",
    price: "",
    bookCover: "",
  });
  const [submit , setSubmit] = useState(false);

  // const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, bookCover: file });
  //   }
  // };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleNewListing(formData.title, formData.isbnNumber, formData.price, formData.bookCover);
    alert("Book listed successfully!");
    setFormData({
      title: "",
    isbnNumber: "",
    price: "",
    bookCover: "",
    });
    navigate("/show-listing");
    setSubmit(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Book Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Book Title
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaBook className="text-gray-500 mr-2" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* ISBN Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ISBN Number
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaHashtag className="text-gray-500 mr-2" />
              <input
                type="text"
                name="isbnNumber"
                value={formData.isbnNumber}
                onChange={handleChange}
                placeholder="Enter ISBN number"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price (₹)
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaRupeeSign className="text-gray-500 mr-2" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Book Cover */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Book Cover Image
            </label>
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
              <FaUpload className="text-gray-500 mx-auto mb-2 text-xl" />
              <input
                type="text"
                name="bookCover"
                onChange={handleChange}
                value={formData.bookCover}
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {/* {preview && (
                <img
                  src={preview}
                  alt="Book Cover Preview"
                  className="mt-3 w-24 h-32 object-cover mx-auto rounded-md shadow-md"
                />
              )} */}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookListingForm;
