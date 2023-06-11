import React, { useState } from 'react'
import axios from 'axios'
import { client } from '../common/axios/axios'

function Quotes() {

    const [name, setName] = useState("")
    const [anime_pic, setAnime_pic] = useState("")

    function getAnime() {
      const res = client.get(`/anime/getAnimeByID/1`, { crossdomain: true });
      res.then(response => {
        setName(response.data.anime)
        setAnime_pic(response.data.anime)
      })
    }

  return (
    <div>
      <button onClick={ getAnime }>
        Generate anime
      </button>
      <h1>{name}</h1>
      <img src={anime_pic} alt="anime" />
    </div>
  )
}

export default Quotes