import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import RootLayout from './layouts/RootLayout'; 
import Home from './pages/Home'; 
import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import NotFound from './pages/NotFound';
import { data } from './module-data.js'; 
import PersonProfile from './components/PersonProfile'; 

const menuItems = [
  { id: 1, label: "Home" },
  { id: 2, label: "Laboratorium 1" },
  { id: 3, label: "Laboratorium 2" }
];

function App() {
  return (
    <RootLayout items={menuItems}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route 
          path="/lab1" 
          element={
            <div>
              <h1>Laboratorium 1</h1>
              {data.map(person => (
                <PersonProfile key={person.id} person={person} /> // Generowanie komponentów dla każdego obiektu
              ))}
            </div>
          } 
        />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
