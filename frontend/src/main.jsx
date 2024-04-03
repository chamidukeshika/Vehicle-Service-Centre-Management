import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles/index.css';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import RegisterScreen from '../screens/RegisterScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';
import AdminRoutes from './components/AdminRoutes.jsx';
import AdminDashboard from '../screens/AdminDashboard.jsx';
import AddEquipment from '../screens/AddEquipment.jsx';
import ViewEquipment from '../screens/viewEquipment.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />


      {/* Private routes */}
      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='/admin/equipments/add' element={<AddEquipment />} />
      <Route path='/admin/equipments/' element={<ViewEquipment/>} />
      
       {/* Admin routes */}
      <Route path='' element={<AdminRoutes />}>
        <Route path='/admin' element={<AdminDashboard />} />
        

      </Route>

    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
