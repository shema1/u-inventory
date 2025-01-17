import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Pages/Users';
import Inventory from './Pages/Inventory';
import Auth from './Pages/Auth';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';


export const msalConfig = {
  auth: {
    clientId: "018594b5-6694-45d6-8380-9c5f078d042f", // Замініть на ваш Application (client) ID
    authority: "https://login.microsoftonline.com/d49750d3-8d44-4ade-9555-fdea0eedce4d", // Замініть на ваш Tenant ID
    redirectUri: "http://localhost:3001/users", // Ваша URL для перенаправлення після логіну
  },
  cache: {
    cacheLocation: "sessionStorage", // Збереження токенів (можна використовувати localStorage)
    storeAuthStateInCookie: false, // Корисно для IE11
  },
};


export const msalInstance = new PublicClientApplication(msalConfig)
function App() {



  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/inventory' element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
