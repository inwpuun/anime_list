export interface CreateAnimeDto {
  name: string
  category: string
  description: string
  anime_pic: string
}

export interface CreateAnimeRankDto {
  rank: string
}

export interface CreateAnimePlannedDto {
  isPlanned: boolean
}

export interface UpdateAnimeDto {
  name: string
  category: string
  description: string
  anime_pic: string
  avg_rank: number
}

export interface UpdateAnimeRankDto {
  name: string
  category: string
  description: string
  anime_pic: string
  rank: string
}

export interface UpdateAnimePlannedDto {
  isPlanned: boolean
}
