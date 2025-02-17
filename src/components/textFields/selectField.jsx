import React from "react";

export default function SelectField({ name, a, options, value, error, title }) {
  return (
    <>
      <div className="px-2">
        <label
          htmlFor={name}
          className="block mb-2 text-base font-medium text-gray-700"
        >
          {title}
        </label>
        <div
          className={`border rounded ${
            error ? "border-red-500 focus-within:border-red-500" : ""
          } focus-within:border-app-blue mb-4`}
        >
          <select
            id={name}
            name={name}
            className={`block text-[#9CA3AF] p-2.5 w-full text-base focus:outline-none bg-transparent`}
            {...a}
            value={value}
          >
            {options}
            {/* {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
          </select>
        </div>
        {error && <p className="text-sm text-red-500 ">{error}</p>}
      </div>
    </>
  );
}
