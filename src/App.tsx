import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Routes from './router/Routes'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-gray-100">
          <Routes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
