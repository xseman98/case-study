import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLoader from '../components/AppLoader'
import ErrorComponent from '../components/ErrorComponent'
import useFetchData from '../hooks/useFetchData'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { deletePost } = usePosts()

  const apiUrl = process.env.REACT_APP_API_URL || ''
  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetchData<Post>(`${apiUrl}/posts/${id}`)
  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useFetchData<Comment[]>(`${apiUrl}/posts/${id}/comments`)

  const [isUserPost, setIsUserPost] = useState(false)

  useEffect(() => {
    if (post && user) {
      setIsUserPost(post.userId === user.id)
    }
  }, [post, user])

  const handleDelete = () => {
    deletePost(Number(id))
    navigate('/posts/my')
  }

  if (postLoading || commentsLoading) {
    return <AppLoader />
  }

  if (postError || commentsError) {
    return (
      <ErrorComponent
        errorMessage={
          (postError as Error).message || (commentsError as Error).message
        }
      />
    )
  }

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <header className="p-4">
        <h1 className="text-3xl font-bold">{post?.title}</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <p className="mb-4">{post?.body}</p>
        {isUserPost && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <ul className="divide-y divide-gray-200">
          {comments?.map((comment) => (
            <li key={comment.id} className="py-4">
              <p className="text-lg font-semibold">{comment.name}</p>
              <p className="text-gray-600">{comment.body}</p>
              <p className="text-gray-500">{comment.email}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default PostPage
