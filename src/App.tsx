import React from 'react';
import './App.css';

import Map from './components/Map';
import Hud from './components/Hud';
import { useInterval } from './hooks/useInterval';

const TICK_INTERVAL = 100; // 100 milliseconds

function tick() {
  // Update the game state
}

function App() {
  useInterval(() => {
    tick();
  }, TICK_INTERVAL)

  return (
    <div className="App">
      Big Foil
      <Map />
      <Hud />
    </div>
  );
}

export default App;
