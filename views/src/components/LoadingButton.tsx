import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center`,
        `${loading && "bg-[#ccc]"}`
      )}
      style={{ backgroundColor: "#ffd52e" }}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-white inline-block">Loading...</span>
        </div>
      ) : (
        <span className={`text-lg font-normal`}>{children}</span>
      )}
    </button>
  );
};
