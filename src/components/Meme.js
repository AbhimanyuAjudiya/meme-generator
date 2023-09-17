import React from "react";
import memesData from "./memesData";

export default function Meme(){

    let url;
    function getMemeImage() {
        const memesArray = memesData.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        url = memesArray[randomNumber].url
        console.log(url)
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
            </div>
        </main>
    )
}