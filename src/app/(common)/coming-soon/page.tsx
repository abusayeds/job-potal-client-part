import React from "react";

const page = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-center px-4">
      <div className="mb-12 animate-slide-up">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Something
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Amazing
          </span>
          is Coming
        </h2>
      </div>
    </div>
  );
};

export default page;
