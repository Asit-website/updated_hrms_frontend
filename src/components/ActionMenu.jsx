import { useState, useRef, useEffect } from 'react';

export default function ActionMenu() {
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
      <button
        onClick={toggleMenu}
       
      >
        <img
          src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746248545/Frame_9688_jxzfmp.png"
          alt="action button"
        
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 -mt-8 mr-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-3">
            <button
              
              className="items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
            >
            <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260260/Vector_zah5tt.svg" alt="Edit" />
             Edit
            </button>
            <button
               className="items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 flex gap-2"
            >
              <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746260280/delete_sgefhv.png" alt="delete" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
