
type Props = {anime: Anime, index: number}
type Anime = {id: number, name: string, anime_pic: string}

export default function AnimeItem({anime, index}: Props) {
    if (anime.anime_pic === "") anime.anime_pic = '/default-image.jpeg'

    return (
        <div className="animeItem" key={index}>
            <img src={anime.anime_pic} alt="anime" />
            <div className="animeItemInfo">
                <h3>{anime.name}</h3>
            </div>
        </div>
    )
}