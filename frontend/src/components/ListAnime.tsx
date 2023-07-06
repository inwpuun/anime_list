import AnimeItem from './AnimeItem'

type Props = {title: string, listAnime: Anime[]}
type Anime = {id: number, name: string, anime_pic: string}

export default function ListAnime({title, listAnime}: Props) {
    
    return (
        <div className="listAnime">
            <h2>{title}</h2>
            <div className="listAnimeContainer">
                {listAnime.map(anime => (
                    <AnimeItem anime={anime} index={anime.id} key={anime.id} />
                ))}
            </div>
        </div>
    )
}