import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbLock, TbLockOpen2 } from "react-icons/tb";
import { TiEyeOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export function DropdownIcon({
  index,
  handleView,
  handleEdit,
  handleBlock,
  handleDelete,
  handleUnblock,
  handleClick,
  create,
  enableUser,
  disableUser,
  btnDelete,
  showOptions,
  showOtherItems,
  showView,
  showEdit,
  showCreate,
  showEnable,
  showDisable,
  showDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <span
        className="pl-1 cursor-pointer inline-block"
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical size={14} />
      </span>
      {isOpen && (
        <div className="absolute right-3 -top-10 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <ul className="py-1">
            <Link to={handleView}>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                <TiEyeOutline size={20} className="mr-1" />
                View
              </li>
            </Link>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleEdit(index)}
            >
              <MdOutlineEdit size={20} className="mr-1" />
              Edit
            </li>
            {showOptions && showCreate && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClick(index)}
              >
                {create}
              </li>
            )}
            {showOtherItems && showDisable && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleDisable(index)}
              >
                <TbLock size={20} className="mr-2" />
                {disableUser}
              </li>
            )}
            {showOtherItems && showEnable && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleEnable(index)}
              >
                <TbLockOpen2 size={20} className="mr-1" />
                {enableUser}
              </li>
            )}
            {showOtherItems && showDelete && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleDelete(index)}
              >
                <RiDeleteBin6Line size={20} className="mr-1 text-red-600" />
                {btnDelete}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
