import React from 'react'
import SideBarButton from './SideBarButton'

type Props = {}

export default function SideBar({}: Props) {
    const [isShrinked, setIsShrinked] = React.useState(false)

    return (
        <div className="side_bar">
            <label>
                <input type="checkbox" onClick={() => setIsShrinked(!isShrinked)} />
                <div className="hamButton">
                    <img src="/logo/menu.svg" alt="" />
                    <h2>Anime.com</h2>
                </div>
            </label>
            <div className="list">
                <SideBarButton title='Home' img='/logo/home.svg' shrinked={isShrinked}  />
                <SideBarButton title='My Anime' img='/logo/book.svg' shrinked={isShrinked} />
                <SideBarButton title='Planned' img='/logo/checkbox.svg' shrinked={isShrinked} />
                <SideBarButton title='Ranking' img='/logo/ribbon.svg' shrinked={isShrinked} />
                <SideBarButton title='Planner' img='/logo/calendar-number.svg' shrinked={isShrinked} />
                <SideBarButton title='Profile' img='/logo/Vector.svg' shrinked={isShrinked} />
            </div>
        </div>   
    )
}