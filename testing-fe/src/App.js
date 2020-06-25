import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PactCallStore } from "./contexts/PactCallContext";
import Home from './components/Home';

function App() {
  return (
    <div class="App">
      <PactCallStore>
        <Home />
      </PactCallStore>
    </div>
  );
}

export default App;
