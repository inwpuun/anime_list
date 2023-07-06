import SideBarButton from './SideBarButton'
import './../css/side-bar.css'

type Props = {isShrinked: boolean, handleShrink: () => void, inPage: string}

export default function SideBar({isShrinked, handleShrink, inPage}: Props) {

    return (
        <div className="side_bar">
            <label>
                <input type="checkbox" checked={isShrinked} onClick={() => handleShrink()} readOnly />
                <div className="hamButton">
                    <img src="/logo/menu.svg" alt="" />
                    <h2>Anime.com</h2>
                </div>
            </label>
            <div className="list">
                <SideBarButton title='Home' img='/logo/home.svg' shrinked={isShrinked} isSelect={inPage=='Home'} />
                <SideBarButton title='My Anime' img='/logo/book.svg' shrinked={isShrinked} isSelect={inPage=='My Anime'} />
                <SideBarButton title='Planned' img='/logo/checkbox.svg' shrinked={isShrinked} isSelect={inPage=='Planned'} />
                <SideBarButton title='Ranking' img='/logo/ribbon.svg' shrinked={isShrinked} isSelect={inPage=='Ranking'} />
                <SideBarButton title='Planner' img='/logo/calendar-number.svg' shrinked={isShrinked} isSelect={inPage=='Planner'} />
                <SideBarButton title='Profile' img='/logo/Vector.svg' shrinked={isShrinked} isSelect={inPage=='Profile'} />
            </div>
        </div>   
    )
}