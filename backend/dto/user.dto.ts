export interface User {
  username: string
  password: string
}

export interface SessionDTO {
  userID: number
  username: string
}
export interface CreateUser {
  username: string
  password: string
  name: string
  user_pic: string
}
