
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prihlasenie from './pages/Prihlasenie';
import Registracia from './pages/Registracia';
import FirstPage from './pages/FirstPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prihlasenie" element={<Prihlasenie />} />
        <Route path="/registracia" element={<Registracia />} />
        <Route path="/first" element={
          <ProtectedRoute>
            <FirstPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;