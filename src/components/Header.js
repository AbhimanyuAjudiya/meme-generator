import React from "react";
import logo from "./images/logo.png";
export default function Header(){
    return (
        <header className="header">
            <img src={logo} className="header--image"/>
            <h1 className="header--title">Meme Generator</h1>
        </header>
    )
}