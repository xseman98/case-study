import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AppNavbar: React.FC = () => {
  const { isAuthenticated, user, signOut, increment, decrement } = useAuth()
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleNameClick = () => {
    setShowPopup(!showPopup)
  }

  const handleIncrementClick = () => {
    setShowPopup(false)
    increment(() => {
      navigate('/posts/all')
    })
  }

  const handleDecrementClick = () => {
    setShowPopup(false)
    decrement(() => {
      navigate('/posts/all')
    })
  }

  const handleLogoutClick = () => {
    signOut(() => {
      setShowPopup(false)
      navigate('/signin')
    })
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Case Study</div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/signin" className="text-white hover:text-gray-300">
                    Sign In
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/posts/my"
                    className="text-white hover:text-gray-300"
                  >
                    My posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts/all"
                    className="text-white hover:text-gray-300"
                  >
                    All posts
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isAuthenticated && (
            <div className="flex items-center space-x-2 ml-4 relative">
              <button className="text-white" onClick={handleNameClick}>
                {`${user?.name} (${user?.id})`}
              </button>
              {showPopup && (
                <div
                  ref={popupRef}
                  className="absolute right-0 top-full bg-white border border-gray-300 shadow-lg mt-1 rounded-md"
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleIncrementClick}
                  >
                    Increment
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleDecrementClick}
                  >
                    Decrement
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
