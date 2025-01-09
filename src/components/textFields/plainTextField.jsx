import React from "react";
import Loader from "../../utils/Loader";

function PlainTextField({
  name,
  type,
  a,
  title,
  error,
  placeholder,
  className,
  disabled,
  onchange,
  value,
  max,
  min,
  keyup,
  loader = false,
}) {
  return (
    <>
      <div className="px-2">
        <div className="flex items-center ">
          <label
            htmlFor={name}
            id={name}
            className={`block text-base font-medium text-gray-700 pb-2 pr-2`}
          >
            {title}
          </label>
          {loader && <Loader />}
        </div>
        <div
          className={`border rounded ${
            error ? "border-red-500 focus-within:border-red-500" : ""
          } focus-within:border-app-blue mb-4`}
        >
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onchange}
            onKeyUp={keyup}
            className={`block text-[#9CA3AF] p-2 w-full text-base appearance-none focus:outline-none bg-transparent ${className}`}
            placeholder={placeholder}
            {...a}
            disabled={disabled}
            max={max}
            min={min}
          />
        </div>
        {error && <p className="text-sm text-red-500 ">{error}</p>}
      </div>
    </>
  );
}

export default PlainTextField;
