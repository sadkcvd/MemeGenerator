import React, { useEffect, useState } from 'react'
import './MemeGenerator.css'
function MemeGenerator() {

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: '',
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(content => setAllMemes(content.data.memes))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const randNum = Math.floor(Math.random() * allMemes.length)
    const randMemeImg = allMemes[randNum].url
    setMeme(prev => ({ ...prev, randomImg: randMemeImg })
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme(prev => ({ ...prev, [name]: value })
    )
  }

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button>Gen</button>
      </form>

      <div className='meme'>
       
        <img src={meme.randomImg} alt='' />
        {meme.randomImg && 
        <h2 className='top'>{meme.topText}</h2>}
        {meme.randomImg && 
        <h2 className='bottom'>{meme.bottomText}</h2>}
      
      </div>

    </div>
  )
}

export default MemeGenerator