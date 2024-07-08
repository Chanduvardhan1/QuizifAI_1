import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div>
      <div className="h-screen flex flex-col gap-6 justify-center items-center">
        <h1 className="text-4xl font-bold text-secondary">Page Not Found</h1>
        <Link to={"/"} className=" text-secondary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
