import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./containers/AuthProvider";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {

  return (
    <AuthProvider>
      <div className="app">
        <Routes> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={ <DashboardPage /> } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
