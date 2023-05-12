import React,{useState,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import Axios from 'axios';
import "./detailPokemonstyle.css"


export default function DetailPokemon () {
    const [searchParams] = useSearchParams()
    let detailId = searchParams.get('id')
    const pokemonName = searchParams.get('name')
    const [pokeinfo, setPokeinfo] = useState([])
    const [pokesequence, setPokesequence] = useState(detailId)
  
    useEffect (()=>{
        fetchInfo(pokesequence)
    },[pokesequence]);
    
    let typecolor = {
        background:"",
        backgroundColor:"",
    }
    function firstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    function padLeft(nr, n, str){
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    }

    const fetchInfo = (j=1) =>{

        Axios.get(`https://pokeapi.co/api/v2/pokemon/${j}`).then((each)=>(setPokeinfo(each.data)));

        
        // (Object.keys(pokeinfo).length) > 0 ? (console.log(pokeinfo)):console.log("empty") 
    }
    function progressbarloader(stat) {
        return (stat/2+`%`)
    }

    function sequencecard(ind){
        if(ind < 1){
            setPokesequence(905)
        }else if(ind>905){
            setPokesequence(1)
        }else{
            setPokesequence(ind)
        }
      
    }


function switchcolor(category){
    switch (category) {
        case "grass":
            typecolor = {
                backgroundColor:"#9bcc50",
            }
            break;
        case "fire":
            typecolor = {
                backgroundColor:"#fd7d24",
            }
            break;
        case "water":
            typecolor = {
                backgroundColor:"#4592c4",
            }
            break;
        case "normal":
            typecolor = {
                backgroundColor:"#a4acaf",
            }
            break;
        case "poison":
            typecolor = {
                backgroundColor:"#b97fc9",
            }
            break;
        case "bug":
            typecolor = {
                backgroundColor:"#729f3f",
            }
            break;
        case "electric":
            typecolor = {
                backgroundColor:"#eed535",
            }
            break;
        case "ground":
            typecolor = {
                background:"linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
                backgroundColor:"#f7de3f",
            }
            break;
        case "fairy":
            typecolor = {
                backgroundColor:"#fdb9e9",
            }
            break;
        case "fighting":
            typecolor = {
                backgroundColor:"#d56723",
            }
            break;
        case "psychic":
            typecolor = {
                backgroundColor:"#f366b9",
            }
            break;
        case "rock":
            typecolor = {
                backgroundColor:"#a38c21",
                color:"white",
            }
            break;
        case "ghost":
            typecolor = {
                backgroundColor:"#7b62a3",
                color:"white",
            }
            break;
        case "ice":
            typecolor = {
                backgroundColor:"#51c4e7",
            }
            break;
        case "dragon":
            typecolor = {
                background:"linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
                backgroundColor:"#53a4cf",
            }
            break;
        case "dark":
            typecolor = {
                backgroundColor:"#707070",
                color:"white",
            }
            break;
        case "steel":
            typecolor = {
                backgroundColor:"#9eb7b8",
            }
            break;
        case "flying":
            typecolor = {
                background:"linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
                backgroundColor:"#3dc7ef",
            }
            break;
    
        default:
            break;
    }
    return typecolor
}

    return(
        <div className="detailwrapper">
            <div className="backgroundInfo">
                <div className="cardsbuttons">
                    <div className="direcbutton" onClick={()=>sequencecard(pokesequence-1)}>&#8249;</div>
                    <div className="direcbutton" onClick={()=>sequencecard(pokesequence-(-1))}>&#8250;</div>
                </div>

                {(Object.keys(pokeinfo).length) > 0 ? (
                <div className="infocontainer">
                    <div className="title">{`${padLeft(pokeinfo.id,3)} - ${firstLetter(pokeinfo.species.name)}`}</div>
                    <div className="pokepic">
                        <img src={`/pokepics/${padLeft(pokeinfo.id,3)}-${firstLetter(pokeinfo.species.name)}.png`} alt={pokeinfo.species.name}/>
                        <div className="typeswrap">
                            <div className="type" style={switchcolor(pokeinfo.types[0].type.name)}>{firstLetter(pokeinfo.types[0].type.name)}</div>
                            {(pokeinfo.types[1]) != undefined ? (<div className="type" style={switchcolor(pokeinfo.types[1].type.name)}>{firstLetter(pokeinfo.types[1].type.name)}</div>):""}
                            {/* <div className="type2">{firstLetter(pokeinfo.types[1].type.name)}</div> */}
                        </div>
                    </div>
                    <div className="infobox">
                        <div className="generalinfo">
                            <div className="statswrapper">
                                <div className="statstitle">Weight:<div className="stats">{pokeinfo.weight/10} kg</div></div>
                                <div className="statstitle">Height:<div className="stats">{pokeinfo.height*10} cm</div></div>
                            </div>
                            <div className="statswrapper">
                                <div className="statstitle">Ability:<div className="stats">{firstLetter(pokeinfo.abilities[0].ability.name)}</div></div>
                                <div className="statstitle">Base Experience:<div className="stats">{pokeinfo.base_experience}</div></div>
                            </div>
                        </div>
                        <div className="battleinfo">
                            <div className="bartitle">HP<div className="bar"><div className="hpbar" style={{width:progressbarloader(pokeinfo.stats[0].base_stat)}}></div></div></div>
                            <div className="bartitle">Speed<div className="bar"><div className="speedbar" style={{width:progressbarloader(pokeinfo.stats[5].base_stat)}}></div></div></div>
                            <div className="bartitle">Attack<div className="bar"><div className="attackbar" style={{width:progressbarloader(pokeinfo.stats[1].base_stat)}}></div></div></div>
                            <div className="bartitle">Defense<div className="bar"><div className="defensebar" style={{width:progressbarloader(pokeinfo.stats[2].base_stat)}}></div></div></div>
                            <div className="bartitle">Special Attack<div className="bar"><div className="superattackbar" style={{width:progressbarloader(pokeinfo.stats[3].base_stat)}}></div></div></div>
                            <div className="bartitle">Special Defense<div className="bar"><div className="superdefensebar" style={{width:progressbarloader(pokeinfo.stats[4].base_stat)}}></div></div></div>
                        </div>
                    </div>
                </div>
                ):""}
            </div>
        </div>
    );
}