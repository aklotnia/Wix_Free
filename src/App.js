import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import ElementContainer from './containers/ElementContainer'
import WebSiteContainer from './containers/WebsiteContainer'
import MouseBackEnd from 'react-dnd-mouse-backend'


function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <ElementContainer />
        <WebSiteContainer />
      </DndProvider>
    </div>
  );
}

export default App;
