import React from "react";
import Loader from "./Loader";

const Modal = ({
  isOpen,
  onClose,
  children,
  header,
  handleClick,
  value,
  text,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl mx-4 fade-in overflow-auto">
        <div className="font-custom px-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{header}</h2>
            <button
              className=" w-8 h-8 rounded-full text-white-500 text-white duration-200 bg-blue-500 shadow hover:bg-blue-700 font-bold text-xl"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <p className="text-sm font-light ">{text}</p>
        </div>
        <div className="mt-4 border-t-2 pt-4">{children}</div>
        <div className="flex justify-center mt-4">
          <button
            disabled={loading}
            className={`${
              loading && "opacity-30 cursor-not-allowed"
            } bg-blue-500 text-white px-4 py-2 w-6/12 rounded hover:bg-blue-700`}
            onClick={handleClick}
          >
            {loading ? <Loader /> : value}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
