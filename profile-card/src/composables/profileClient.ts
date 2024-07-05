import type { ApiResponse, UserData } from '@/types'
import useFetch from './useFetch'

export const getProfile = async (): Promise<ApiResponse<{ data: UserData }>> => {
  return await useFetch<{ data: UserData }>('/api/user')
}

export const updateProfile = async (body: UserData): Promise<ApiResponse<{ msg: string }>> => {
  return await useFetch<{ msg: string }>('/api/user', {
    method: 'PUT',
    body
  })
}
