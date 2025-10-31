import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useFirebase } from "../context/fireBase";
import Loader from "../components/Loader.jsx";

const ShowListing = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // const firebase = useFirebase();
  // const [url , setUrl ] = useState(null);

  // useEffect(() => {
  //   if(book.imageUrl){
  //     firebase.getDownloadURL(book.imageUrl).then((image) => {
  //       setUrl(image);
  //     })
  //   }
  // },[])

  useEffect(() => {
    firebase.getAllListings().then((docs) => {
      setBooks(docs.docs);
      setLoading(false);
    });
  }, [firebase]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center mt-5">
        📚 Available Books
      </h2>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {books?.length > 0 ? (
          books?.map((book) => (
            <BookCard key={book.id} id={book.id} book={book.data()} />
          ))
        ) : (
          <p className="text-gray-500">No books listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShowListing;
