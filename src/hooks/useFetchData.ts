import { useState, useEffect } from 'react'

interface FetchDataResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null | unknown
}

function useFetchData<T>(url: string): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null | unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch data from server')
        }
        const jsonData = await response.json()
        setData(jsonData)
        setError(null)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetchData
