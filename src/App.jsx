import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer} from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="937040149824-eqmnmi741m4um5ie9vam568vds7lbj11.apps.googleusercontent.com">
      <ToastContainer />
      <AppRoutes />
      </GoogleOAuthProvider>
    </div>
  )
}

export default App