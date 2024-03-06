import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLayout from '../components/AppLayout'
import HomePage from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import PostsPage from '../pages/PostsPage'
import PostPage from '../pages/PostPage'
import ErrorPage from '../pages/ErrorPage'

const RoutesComponent: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
      <Route
        path="/signin"
        element={
          <AppLayout>
            <SignInPage />
          </AppLayout>
        }
      />
      {isAuthenticated ? (
        <>
          <Route
            path="/posts/:filter"
            element={
              <AppLayout>
                <PostsPage />
              </AppLayout>
            }
          />
          <Route
            path="/post/:id"
            element={
              <AppLayout>
                <PostPage />
              </AppLayout>
            }
          />
          <Route
            path="*"
            element={
              <AppLayout>
                <ErrorPage />
              </AppLayout>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/posts/:filter"
            element={<Navigate to="/signin" replace />}
          />
          <Route path="/post/:id" element={<Navigate to="/signin" replace />} />
          <Route
            path="*"
            element={
              <AppLayout>
                <ErrorPage />
              </AppLayout>
            }
          />
        </>
      )}
    </Routes>
  )
}

export default RoutesComponent
