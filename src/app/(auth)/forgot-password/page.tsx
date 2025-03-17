"use client";

import React from "react";
import Image from "next/image";
import ForgotPasswordForm from "./forgot-password-form";

const forgotPassword = () => {
  return (
    <div className="h-screen w-full flex-row items-center justify-center scroll-auto px-10 py-10 sm:flex lg:px-0 lg:py-0 lg:bg-white">
      <div className="block pb-16 text-center text-4xl font-extrabold text-[#1F2937] md:w-1/2 lg:hidden">
        Barangay Online Services
      </div>

      <div className="hidden h-full w-1/2 flex-auto items-center justify-center lg:flex dark:border-l ">
        <Image 
        src="/BOS 1.svg"
        alt="BOS Logo"
        width={952}
        height={1039}
        />
      </div>
      <div className="mx-auto w-full max-w-md flex-col items-center justify-center sm:rounded-xl sm:bg-white sm:py-12 sm:pt-8 sm:shadow-md md:flex md:h-screen md:min-h-full md:w-1/2 md:max-w-none">
      <ForgotPasswordForm/>
      </div>
    </div>
  );
};

export default forgotPassword;
