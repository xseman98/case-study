import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import AppLoader from '../components/AppLoader'
import ErrorComponent from '../components/ErrorComponent'
import { z } from 'zod'
import useFetchData from '../hooks/useFetchData'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

const PostsArraySchema = z.array(PostSchema)

interface PostsContextType {
  posts: Post[] | null
  deletePost: (postId: number) => void
  filterPosts: (filter: string | undefined) => void
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider')
  }
  return context
}

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null)
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const apiUrl = process.env.REACT_APP_API_URL || ''
  const {
    data: fetchedPosts,
    loading,
    error,
  } = useFetchData<Post[]>(`${apiUrl}/posts`)

  useEffect(() => {
    try {
      const validatedPosts = fetchedPosts
        ? PostsArraySchema.parse(fetchedPosts)
        : null
      setPosts(validatedPosts)
      setFilteredPosts(validatedPosts)
    } catch (err) {
      console.error('Error validating posts:', err)
    }
  }, [fetchedPosts])

  const deletePost = (postId: number) => {
    if (!filteredPosts) return
    setDeletedIds([...deletedIds, postId])
    const updatedPosts = filteredPosts.filter((post) => post.id !== postId)
    setFilteredPosts(updatedPosts)
  }

  const filterPosts = (filter: string | undefined) => {
    if (!posts) return

    let filteredPosts = posts
    deletedIds.map((id) => {
      filteredPosts = filteredPosts.filter((post) => post.id !== id)
      return
    })

    if (filter === 'my') {
      setFilteredPosts(filteredPosts.filter((post) => post.userId === user?.id))
      return
    }

    setFilteredPosts(filteredPosts)
  }

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return <ErrorComponent errorMessage={(error as Error).message} />
  }

  return (
    <PostsContext.Provider
      value={{ posts: filteredPosts, deletePost, filterPosts }}
    >
      {children}
    </PostsContext.Provider>
  )
}
