import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFirebase } from "../context/fireBase.jsx";
import Loader from "../components/Loader.jsx";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const BookView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const firebase = useFirebase();
  const [loader, setLoader] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    firebase.getBookById(id).then((result) => {
      setBook(result.data());
      setLoader(false);
    });
  }, [firebase, id]);

  const handleBuy = async () => {
    setIsBuying(true);
    const result = await firebase.placeOrder(id, quantity , book.name , book.price , book.userEmail);
    setIsBuying(false);
    alert("Order placed successfully!");
  };

  if (loader) return <Loader />;

  if (!book)
    return (
      <div className="text-center text-gray-600 mt-10">Book not found</div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-8 max-w-5xl w-full">
        {/* Left: Book Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={book.imageUrl}
            alt={book.name}
            className="rounded-lg object-cover w-full h-80 md:h-96"
          />
        </div>

        {/* Right: Book Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{book.name}</h2>
            <p className="text-gray-500 mt-1">ISBN: {book.imbn}</p>
            <p className="text-xl font-semibold text-blue-600 mt-2">
              ₹{book.price}
            </p>

            <p className="text-gray-600 mt-4">
              This book is available in our store. You can view or manage it in your
              dashboard if you are the uploader.
            </p>

            {/* Author Details */}
            <div className="mt-6 bg-gray-100 p-3 rounded-lg">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Author Details
              </h3>
              <div className="flex items-center gap-2 text-gray-700">
                <FaUser className="text-blue-600" />
                <p>{book.displayName}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mt-1">
                <MdEmail className="text-blue-600" />
                <p>{book.userEmail}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="qty" className="font-medium">
                Qty:
              </label>
              <input
                id="qty"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-3 py-1 w-20"
              />
              <span className="text-gray-700 ml-2">
                Total:{" "}
                <span className="font-semibold">
                  ₹{book.price * quantity}
                </span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/show-listing" className="flex-1">
              <button className="w-full border border-blue-600 text-blue-600 rounded-lg py-2 hover:bg-blue-50 transition">
                Back to Home
              </button>
            </Link>

            <button
              onClick={handleBuy}
              disabled={isBuying}
              className={`flex-1 py-2 rounded-lg text-white font-medium transition ${
                isBuying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isBuying ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookView;
