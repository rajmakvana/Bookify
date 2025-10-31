import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/fireBase.jsx";
import Loader from "../components/Loader.jsx";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const OrdersPage = () => {
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    firebase.getOrdersByAuthorEmail(firebase.user.email).then((result) => {
      setOrders(result.docs);
      setLoader(false);
    })
  }, [firebase]);

  if (loader) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📦 Your Book Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You don’t have any book orders yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {order.data().bookName}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Order ID: {order.id.slice(0, 8)}...
              </p>

              <div className="mt-3 flex items-center gap-2 text-gray-700">
                <FaUser className="text-blue-600" />
                <p>{order.data().userEmail.split("@")[0]}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mt-1">
                <MdEmail className="text-blue-600" />
                <p>{order.data().userEmail}</p>
              </div>

              <div className="mt-3 text-gray-700">
                <p>
                  Quantity:{" "}
                  <span className="font-semibold">{order.data().qty}</span>
                </p>
                <p>
                  Total Price:{" "}
                  <span className="font-semibold text-blue-600">
                    ₹{order.data().bookPrice}
                  </span>
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Ordered on:{" "}
                {new Date(order.data().orderDate?.seconds * 1000).toLocaleDateString()}
              </p>

              <button className="px-4 py-2 bg-blue-500 rounded-lg mt-3 text-white font-medium" >Accept Order</button>

            </div>

            
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
