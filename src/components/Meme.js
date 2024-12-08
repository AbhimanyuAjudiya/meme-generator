import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        randomImage: "https://i.imgflip.com/26am.jpg"
    });
    const [allMeme, setAllMeme] = React.useState([]);
    const [texts, setTexts] = React.useState([]);
    const [draggingText, setDraggingText] = React.useState(null);

    React.useEffect(function() {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMeme(data.data.memes);
        }
        getMemes();
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length);
        const url = allMeme[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    function addNewText() {
        setTexts(prevTexts => [
            ...prevTexts,
            {
                id: Date.now(),
                text: "",
                position: { x: 50, y: 50 }
            }
        ]);
    }

    function removeText(id) {
        setTexts(prevTexts => prevTexts.filter(text => text.id !== id));
    }

    function handleTextChange(event, id) {
        const { value } = event.target;
        setTexts(prevTexts =>
            prevTexts.map(text =>
                text.id === id ? { ...text, text: value } : text
            )
        );
    }

    function handleDragStart(event, id) {
        setDraggingText(id);
    }

    function handleDrag(event) {
        if (!draggingText) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setTexts(prevTexts =>
            prevTexts.map(text =>
                text.id === draggingText
                    ? {
                          ...text,
                          position: {
                              x: Math.max(0, Math.min(100, x)),
                              y: Math.max(0, Math.min(100, y))
                          }
                      }
                    : text
            )
        );
    }

    function handleDragEnd() {
        setDraggingText(null);
    }

    return (
        <main>
            <div className="form">
                    {texts.map(text => (
                        <div key={text.id} className="text-block">
                            <input
                                type="text"
                                placeholder="Enter text"
                                className="text--input"
                                value={text.text}
                                onChange={(event) => handleTextChange(event, text.id)}
                            />
                            <button
                                className="remove--button"
                                onClick={() => removeText(text.id)}
                            >
                                Remove ✖
                            </button>
                        </div>
                    ))}
                <button 
                    className="form--button"
                    onClick={addNewText}
                >
                    Add New Text ➕
                </button>
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
                <input 
                    type="file"
                    accept="image/*"
                    className="form--upload"
                    onChange={handleUpload}
                />
            </div>
            <div 
                className="meme"
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
            >
                <img alt="" src={meme.randomImage} className="meme--image" />
                {texts.map(text => (
                        <h2
                            className="meme--text"
                            style={{
                                left: `${text.position.x}%`,
                                top: `${text.position.y}%`,
                                transform: "translate(-50%, -50%)",
                                position: "absolute",
                                cursor: "move"
                            }}
                            onMouseDown={(event) => handleDragStart(event, text.id)}
                        >
                            {text.text}
                        </h2>
                ))}
            </div>
        </main>
    );
}
