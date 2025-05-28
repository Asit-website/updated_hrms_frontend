import React, { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export const DescriptionModal = ({ data = {}, title = "Details", onClose }) => {

    const wrapperRef = useClickOutside(() => {
        onClose();
    });

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4">
            <div
                ref={wrapperRef}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 animate-fadeIn h-[480px] overflow-auto"
            >
                <nav className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-all duration-200"
                    >
                        {/* <img className="w-5 h-5 md:w-6 md:h-6" src={ccc} alt="Close" /> */}
                    </button>
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="border border-gray-200 rounded-lg p-3 shadow-md">
                            <div className="text-[14px] font-bold uppercase tracking-wide mb-1">
                                {key.replace(/([A-Z])/g, " $1")}
                            </div>
                            <div className="text-sm text-gray-800 break-words">
                                {value || "-"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
