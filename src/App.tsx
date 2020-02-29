import React from 'react';
import './App.css';

import Map from './components/Map';
import Hud from './components/Hud';

function App() {
  return (
    <div className="App">
      Big Foil
      <Map />
      <Hud />
    </div>
  );
}

export default App;
