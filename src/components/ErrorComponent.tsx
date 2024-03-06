import React from 'react'

interface ErrorComponentProps {
  errorMessage: string
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">{errorMessage}</p>
          <p className="mt-4">Please try again later.</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent
