import '../../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { ToastContainer } from 'react-toastify';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return(
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp