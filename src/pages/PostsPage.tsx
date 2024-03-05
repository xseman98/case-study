import React from 'react'
import useFetchData from '../hooks/useFetchData'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const PostsPage: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL || ''
  const {
    data: posts,
    loading,
    error,
  } = useFetchData<Post[]>(`${apiUrl}/posts`)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PostsPage
