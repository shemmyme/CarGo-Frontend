import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // Import the PayPalScriptProvider
import App from './App';
import './index.css';

const PAYPAL_CLIENT_ID = 'ARZWhEaMFhfAyhGiTUChP6jZktzp2M07CUtlYL6soCCFU3xcU1FZHIqKI3SHWVRj3A_Z9oXkt3lHKglw'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>,
);
