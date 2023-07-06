import React, { useEffect } from 'react'
import MainTop from '../components/MainTop'
import SideBar from '../components/SideBar'
import { client } from '../axios'
import ListAnime from '../components/ListAnime'

type Props = {isShrinked: boolean, handleShrink: () => void}

export default function Planner({isShrinked, handleShrink}: Props) {
    const [listAnime, setListAnime] = React.useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await client.get('/anime/getAllAnime');
            setListAnime(response.data.anime)
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchData();
    }, []);
    
    console.log(listAnime)

    return (
        <>
            <SideBar isShrinked={isShrinked} handleShrink={handleShrink} inPage='Planner' />
            <input type="checkbox" checked={isShrinked} readOnly />
            <div className="main">
                <MainTop username='INWPUUN' topic='My Anime' />
                <ListAnime listAnime={listAnime} title='Planner' />
            </div>
        </>
    )
}