import React from "react";
import memesData from "./memesData";

export default function Meme(){
    /**
     * Note: if you ever need the old value of state
     * to help you determine the new value of state,
     * you should pass a callback function to your
     * state setter function instead of using
     * state directly. This callback function will
     * receive the old value of state as its parameter,
     * which you can then use to determine your new
     * value of state.
     */
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemeImages, setAllMemeImages] = React.useState(memesData)
    function getMemeImage() {
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }
    return(
        <main>
            <div className="form">
                <input
                    className="form--input"
                    type="text"
                    placeholder="Fount text"
                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image  🖼
                </button>
                <img src={meme.randomImage} className="meme--image" />
            </div>
        </main>
    )
}