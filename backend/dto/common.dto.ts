import { DateTime } from "aws-sdk/clients/devicefarm"

export interface MyAnimeDto {
  anime: PartAnimeDto[]
}

export interface PartAnimeDto {
  id: number
  name: string
  anime_pic: string
}

export interface AllRankDto {
  all_rank: string[]
}

export interface ActiveUserDto {
  all_user_amount: number
}
