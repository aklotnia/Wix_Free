import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import ElementContainer from './containers/ElementContainer'
import WebSiteContainer from './containers/WebsiteContainer'
import ToolConsole from './containers/ToolConsole'


function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <ElementContainer />
        <WebSiteContainer />
        {/* <ToolConsole /> */}
      </DndProvider>
    </div>
  );
}

export default App;
