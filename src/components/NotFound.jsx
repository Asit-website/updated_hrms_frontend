import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <NavLink
          to="/"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound