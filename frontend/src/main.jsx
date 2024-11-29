import React,{StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css"
import Layout from "./Components/Layout/Layout"
import Home from './Components/Home/Home';
import Login from './Components/Admin/Login';
import Register from './Components/Admin/Register';
import { persistor, store } from './Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Shop from './Components/Shop/Shop';
import Contactus from './Components/Contactus/Contactus';
import Profile from './Components/profile/Profile';

const router = createBrowserRouter([
  {
    path :'/',
    element: <Layout/>,
    children : [
      {
        path:'',
        element : <Home/>
      },
      
      {
        path:'login',
        element : <Login/>
      },
      
      {
        path:'register',
        element : <Register/>
      },
      
      {
        path:'shop',
        element : <Shop/>
      },
      
      {
        path:'contact',
        element : <Contactus/>
      },
      {
        path:'profile',
        element : <Profile/>
      },
      

      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
</StrictMode>
)
