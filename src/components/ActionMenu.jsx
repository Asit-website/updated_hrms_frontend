import React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function ActionMenu({ options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button onClick={toggleMenu}>
        <img
          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746248545/Frame_9688_jxzfmp.png"
          alt="action button"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 -mt-8 mr-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick(); 
                  setIsOpen(false); 
                }}
                className={`items-center w-full px-4 py-2 text-sm flex gap-2 ${option.danger
                  ? 'text-red-600 hover:bg-red-100'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {option.icon && <img src={option.icon} alt={option.label} />}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
