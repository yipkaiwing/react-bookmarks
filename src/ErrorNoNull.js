import React from "react";
import { Link } from "react-router-dom";

const ErrorNoNull = () => {
  return (
    <>
      <section className="bg-primary relative z-10 py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-black sm:text-[80px] md:text-[100px]">
                  Oh Sorry
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                  Oops! Something went wrong
                </h4>
                <p className="mb-8 text-lg text-black">
                  Bookmark website name or URL cannot be empty
                </p>
                <Link to = '/'
                  className="hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-blue-200"
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
};

export default ErrorNoNull;
