export type SignInBody = {
  username: string
  password: string
}

export type SignUpBody = {
  fullname: string
  username: string
  city: string
  country: string
  job: string
  password: string
  cpassword: string
}

export type UserData = {
  avatar: string
  fullname: string
  city: string
  country: string
  job: string
  about: string
  instagram: string
  twitter: string
  facebook: string
}

export type ApiResponse<T> = {
  data: T | null
  error: { error: string } | null
}
