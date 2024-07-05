export const API_URL = 'https://profile-card-api.vercel.app'

type UseFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  contentType?: string
}

const DEFAULT_OPTIONS: UseFetchOptions = {
  method: 'GET',
  contentType: 'application/json'
}

const useFetch = async <T>(
  endpoint: string,
  opts: UseFetchOptions = {}
): Promise<{
  data: T | null
  error: { error: string } | null
}> => {
  const {
    method = DEFAULT_OPTIONS.method,
    body = null,
    contentType = DEFAULT_OPTIONS.contentType
  } = opts

  const result: {
    data: T | null
    error: { error: string } | null
  } = {
    data: null,
    error: null
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': contentType || 'application/json',
      Accept: 'application/json'
    }

    const token = localStorage.getItem('token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers
    })

    const responseData = await res.json()

    if (res.ok) {
      result.data = responseData
    } else {
      result.error = responseData
    }
  } catch (error) {
    result.error = { error: 'An unexpected error occurred' }
  }

  return result
}

export default useFetch
