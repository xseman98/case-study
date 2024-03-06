import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PostsProvider } from './context/PostsContext'
import Routes from './router/Routes'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <div className="App bg-gray-100">
            <Routes />
          </div>
        </Router>
      </PostsProvider>
    </AuthProvider>
  )
}

export default App
