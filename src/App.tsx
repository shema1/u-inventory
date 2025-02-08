import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRoutes from './routes';




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
