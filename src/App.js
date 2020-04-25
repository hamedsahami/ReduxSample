import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {Gallery} from "./features/gallery/Gallery";

function App() {
    return (
        <div className="App">
            <Gallery/>
        </div>
    );
}

export default App;
