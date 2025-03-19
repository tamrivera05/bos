"use client";

import React from "react";
import LogInForm from "./log-in-form";

const logIn = () => {
  return (
    <div className="h-screen w-full flex-row items-center justify-center scroll-auto px-10 py-10 sm:flex lg:bg-[#1F2937] lg:px-0 lg:py-0">
      <div className="block pb-16 text-center text-4xl font-extrabold text-[#1F2937] md:w-1/2 lg:hidden">
        Barangay Online Services
        <div className="pt-2 text-lg font-normal">Welcome back!</div>
      </div>

      <div className="hidden h-full w-1/2 flex-auto items-center justify-center lg:flex dark:border-l">
        <div className="text-[6rem] leading-none font-extrabold text-white">
          Barangay
          <br />
          Online
          <br />
          Services
          <div className="pt-4 text-3xl font-normal text-white">
            Welcome back!
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md flex-col items-center justify-center sm:rounded-xl sm:bg-white sm:py-12 sm:pt-8 sm:shadow-md md:flex md:h-screen md:min-h-full md:w-1/2 md:max-w-none">
        <LogInForm />
      </div>
    </div>
  );
};

export default logIn;
