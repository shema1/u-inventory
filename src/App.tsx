import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRoutes from './routes';


export const msalConfig = {
  auth: {
    clientId: "018594b5-6694-45d6-8380-9c5f078d042f", // Замініть на ваш Application (client) ID
    authority: "https://login.microsoftonline.com/d49750d3-8d44-4ade-9555-fdea0eedce4d", // Замініть на ваш Tenant ID
    redirectUri: "http://localhost:3001/auth", // Ваша URL для перенаправлення після логіну
  },
  cache: {
    cacheLocation: "sessionStorage", // Збереження токенів (можна використовувати localStorage)
    storeAuthStateInCookie: false, // Корисно для IE11
  },
};


export const msalInstance = new PublicClientApplication(msalConfig)
function App() {
  return (
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
      </MsalProvider>
    </Provider>
  );
}

export default App;
