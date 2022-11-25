import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import './App.css';
import "./components/Pokecardstyle.css";
import {BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom';
import PokeCard from './components/PokeCard';
import DetailPokemon from './components/DetailPokemon';

const API_ALL= "https://pokeapi.co/api/v2/pokemon?limit=1154";
const API_PAG= "https://pokeapi.co/api/v2/pokemon?limit=24";

let counter=24;

function App() {
  const [pokelist, setPokelist] = useState([])
  const [loaderdisplay, setloaderdisplay] = useState({display:""})

const fetchPokedex = (j=24) =>{
  let pokeUrlarray=[];

  for (let i=1; i<=j;i++){
    pokeUrlarray.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
  }
  Axios.all(pokeUrlarray.map((url)=> Axios.get(url))).then((eachurl)=>setPokelist(eachurl));
  // console.log(pokelist[0].data);

}

 
  const pokeSearch = (input) =>{
    let filteredPokemon = [];
    // console.log(isNaN(+input));
    if(input===""){
      fetchPokedex(48)
      setloaderdisplay({display:"block"})
    }else if (isNaN(+input) ==false){
      input=+input;
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`).then((eachurl)=>(
        filteredPokemon.push(eachurl)
        ))
    }else{
      input=input.toLowerCase();
      for (var i in pokelist){
        if(pokelist[i].data.species.name.includes(input)){
          filteredPokemon.push(pokelist[i]);
        }
      }
    }
    setPokelist(filteredPokemon)
  }


  function pokeloader (){
    counter=counter+24;
    
    if(counter >=905){
      counter=905;
      setloaderdisplay({display:"none"})
    }
    fetchPokedex(counter)
  }
  function pokeloaderall (){
    setloaderdisplay({display:"none"})
    fetchPokedex(905)
  }



  useEffect(() =>{
    // const abortCont=new AbortController();
    fetchPokedex();
  },[]);

 

  return (
      <Router>
        <div className="App">
          <h1>Pokédex</h1>
          <div className='searchBar'>
            <div className="searchWrapper">
              <input className='search' type="input" placeholder='Search for your pokémon by index or name' onChange={(e)=>{pokeSearch(e.target.value)}}></input>
              <img src="./src/assets/searchbar/magnifying.svg" alt="search" onClick={()=>{}}></img>
            </div>
            <div className='navbuttons'>
              <div className='navstyling'></div>
              <div className='navbuttonwrapper'>
                <Link to="/" className='pokedex'>Pokédex</Link>
                {/* <Link to="/detail" className='detail' onClick={()=>{fetchInfo()}}>Detail</Link> */}
              </div>
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={
            <>
              <div className="cardswrapper">
                {
                  pokelist.map((each,key)=>(
                    <div key={key}>
                      <PokeCard name={each.data.species.name} index={each.data.id} category={each.data.types[0].type.name} 
                      tp2={(each.data.types[1]) != undefined ? (each.data.types[1].type.name):""} />
                    </div>
                  ))
                  }
              </div>
              <div className='buttonWrapper'>   
                <button className='loadpokemon' style={loaderdisplay} onClick={()=>{pokeloader()}}>Load more Pokémon</button>
                <button className='loadall'  style={loaderdisplay} onClick={()=>{pokeloaderall()}}>Load all Pokemons</button>
              </div>
            </>
            }/>
            <Route path="/detail" element={
                <DetailPokemon />
            }/>
          </Routes>     
        </div>
      </Router>
  )
}

export default App
