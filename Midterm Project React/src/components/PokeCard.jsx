import React from "react";
import { useNavigate } from 'react-router-dom'
import "./Pokecardstyle.css"

export default function PokeCard ({name,index,category}) {
    const navigate = useNavigate();
    let catcolor = {
        background:"",
        backgroundColor:"",
    }

    function firstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    function padLeft(nr, n, str){
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    }

    switch (category) {
        case "grass":
            catcolor = {
                backgroundColor:"#9bcc50",
            }
            break;
        case "fire":
            catcolor = {
                backgroundColor:"#fd7d24",
            }
            break;
        case "water":
            catcolor = {
                backgroundColor:"#4592c4",
            }
            break;
        case "normal":
            catcolor = {
                backgroundColor:"#a4acaf",
            }
            break;
        case "poison":
            catcolor = {
                backgroundColor:"#b97fc9",
            }
            break;
        case "bug":
            catcolor = {
                backgroundColor:"#729f3f",
            }
            break;
        case "electric":
            catcolor = {
                backgroundColor:"#eed535",
            }
            break;
        case "ground":
            catcolor = {
                background:"linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
                backgroundColor:"#f7de3f",
            }
            break;
        case "fairy":
            catcolor = {
                backgroundColor:"#fdb9e9",
            }
            break;
        case "fighting":
            catcolor = {
                backgroundColor:"#d56723",
            }
            break;
        case "psychic":
            catcolor = {
                backgroundColor:"#f366b9",
            }
            break;
        case "rock":
            catcolor = {
                backgroundColor:"#a38c21",
            }
            break;
        case "ghost":
            catcolor = {
                backgroundColor:"#7b62a3",
            }
            break;
        case "ice":
            catcolor = {
                backgroundColor:"#51c4e7",
            }
            break;
        case "dragon":
            catcolor = {
                background:"linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
                backgroundColor:"#53a4cf",
            }
            break;
        case "dark":
            catcolor = {
                backgroundColor:"#707070",
            }
            break;
        case "steel":
            catcolor = {
                backgroundColor:"#9eb7b8",
            }
            break;
        case "flying":
            catcolor = {
                background:"linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
                backgroundColor:"#3dc7ef",
            }
            break;
    
        default:
            break;
    }

    const handleDetailLink = () => {
        navigate(`/detail?id=${index}&name=${name}`)
    }

    return(
        <div className="card" onClick={handleDetailLink}>
            <div className="nameWrap">
                <div className="name">{firstLetter(name)}</div>
                <div className="id">{index}</div>
            </div>
            <div className="pokethumb">
                <img src={`/src/assets/pokepics/${padLeft(index,3)}-${firstLetter(name)}.png`} alt={name}/>
            </div>
            <div className="category" style={catcolor}>{firstLetter(category)}</div>
        </div>
    );

}

