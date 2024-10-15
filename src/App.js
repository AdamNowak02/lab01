import React from 'react';
import logo from './logo.svg';
import './App.css';
import { data } from './module-data'; // Importuj wygenerowane dane
import PersonProfile from './PersonProfile'; // Importuj komponent

function App() {
  return (
    <div className="App">
     
      <main>
        <h1>Person Profiles</h1>
        {data.map(person => (
          <PersonProfile key={person.id} person={person} /> // Generowanie komponentów dla każdego obiektu
        ))}
      </main>
    </div>
  );
}

export default App;
