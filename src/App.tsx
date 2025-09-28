
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prihlasenie from './pages/Prihlasenie';
import Registracia from './pages/Registracia';
import FirstPage from './pages/Matches';
import ProtectedRoute from './components/ProtectedRoute';
import MyTips from './pages/MyTips';
import Points from './pages/Points';
import AdminPanel from './pages/AdminPanel';
import AdminMatch from './pages/AdminMatch';
import AdminResult from './pages/AdminResult';
import Ranking from './pages/Ranking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-tips" element={<MyTips />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/points" element={<Points />} />
        <Route path="/adminpanel" element={
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/admin-result" element={
          <ProtectedRoute adminOnly>
            <AdminResult />
          </ProtectedRoute>
        } />
        <Route path="/admin-match" element={
          <ProtectedRoute adminOnly>
            <AdminMatch />
          </ProtectedRoute>
        } />
        <Route path="/prihlasenie" element={<Prihlasenie />} />
        <Route path="/registracia" element={<Registracia />} />
  <Route path="/matches" element={
          <ProtectedRoute>
            <FirstPage />
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;