import React from 'react';
import './App.css';

import { ContactPage } from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* TODO: make header its own component */}
      <header className="App-header">
        <img src={'https://via.placeholder.com/50'} className="contact-app-logo" alt="logo" />
        <h1>
          My UT Phone Book
        </h1>
      </header>
      <ContactPage />
    </div>
  );
}

export default App;
