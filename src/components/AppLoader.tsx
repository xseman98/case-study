import React from 'react'

const AppLoader: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-gray-900">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default AppLoader
