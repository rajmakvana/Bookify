import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full mt-30 ">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-blue-600 font-medium mt-3">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
