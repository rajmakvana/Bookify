import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { useFirebase } from "../context/fireBase";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book , id }) => {
  const navigate = useNavigate();

  // const firebase = useFirebase();
  // const [url , setUrl ] = useState(null);

  // useEffect(() => {
  //   if(book.imageUrl){
  //     firebase.getDownloadURL(book.imageUrl).then((image) => {
  //       setUrl(image);
  //     })
  //   }
  // },[])

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 w-full sm:w-72">
      <div className="relative">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.name}
            className="h-70 w-full object-cover"
          />
        ) : (
          <div className="h-48 flex items-center justify-center bg-gray-100">
            <FaBook className="text-4xl text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {book.name}
        </h3>
        {book.imbn && (
          <p className="text-sm text-gray-500 mt-1">ISBN: {book.imbn}</p>
        )}
        {book.price && (
          <p className="text-md font-medium text-blue-600 mt-2">
            ₹{book.price}
          </p>
        )}
        <button className="text-md bg-yellow-200 px-4 py-1 rounded-md mt-2 hover:bg-yellow-300 transition" onClick={() => navigate(`/book/view/${id}`)}>view Book</button>
      </div>
    </div>
  );
};

export default BookCard;
