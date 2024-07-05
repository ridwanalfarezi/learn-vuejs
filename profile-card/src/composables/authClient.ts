import type { ApiResponse, SignInBody, SignUpBody } from '@/types'
import useFetch from './useFetch'

export const signIn = async (
  body: SignInBody
): Promise<ApiResponse<{ token: string; msg: string }>> => {
  return await useFetch<{ token: string; msg: string }>('/api/login', {
    method: 'POST',
    body
  })
}

export const signUp = async (body: SignUpBody): Promise<ApiResponse<{ msg: string }>> => {
  return await useFetch<{ msg: string }>('/api/register', {
    method: 'POST',
    body
  })
}
