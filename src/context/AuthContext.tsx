import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: number
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  signIn: (id: number, name: string, callback?: () => void) => void
  signOut: (callback?: () => void) => void
  increment: () => void
  decrement: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  increment: () => {},
  decrement: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const signIn = (id: number, name: string, callback?: () => void) => {
    setIsAuthenticated(true)
    setUser({ id, name })
    if (callback) callback()
  }

  const signOut = (callback?: () => void) => {
    setIsAuthenticated(false)
    setUser(null)
    if (callback) callback()
  }

  const increment = () => {
    if (!user) return
    setUser({ id: user.id + 1, name: user.name })
  }

  const decrement = () => {
    if (!user) return
    if (user.id === 1) return
    setUser({ id: user.id - 1, name: user.name })
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, increment, decrement }}
    >
      {children}
    </AuthContext.Provider>
  )
}
