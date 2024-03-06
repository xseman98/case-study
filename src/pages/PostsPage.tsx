import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'

const PostsPage: React.FC = () => {
  const { filter } = useParams()
  const { posts, deletePost, filterPosts } = usePosts()
  const { user } = useAuth()

  useEffect(() => {
    filterPosts(filter)
  }, [filter])

  const handleDelete = (postId: number) => {
    deletePost(postId)
  }

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <h1 className="text-3xl font-bold mb-6 p-4 text-center">
        List of {filter} posts
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        {posts?.length || 0} post/s
      </p>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              <Link
                to={`/post/${post.id}`}
                className="text-xl font-semibold mb-4"
              >
                {post.title}
              </Link>
              <p className="text-gray-700">{post.body}</p>
              {user && post.userId === user.id && (
                <button
                  className="absolute bottom-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PostsPage
