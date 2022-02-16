/* eslint-disable react/react-in-jsx-scope */
import { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ListCap from './test';

function App() {
    // const [count, setCount] = useState(0)
    const [count, setCount] = useState(0);
    const [cap, setCap] = useState([]);
    const [htm, setHtm] = useState();
    const url = 'https://kitsu.io/api/edge/anime';
  
    useEffect( () =>{
        axios.get(url)
            .then( response => { 
                setCap(response.data.data);                 
                
                setHtm(response.data.links);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    },[]);
  

    return (
        <div className="App">
            <button type='button' onClick={(() => setCount(count +1))}>
                <p>{count}</p>
            </button>
            
            <ListCap/>
        </div>
    );
}

export default App;
