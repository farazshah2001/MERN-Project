import React from 'react';
import './App.css';
import ListOrders from './pages/ListOrders';
import ListSingleOrder from './pages/ListSingleOrder';
import CreateOrder from './pages/CreateOrder';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Greetings from './component/Greetings';
import Login from './component/Login';
import Signup from './component/Signup';
import { AppProvider } from './contextAPI/context';
function App () {
  return (
    <div className="App">
      <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />
          <Route path="orders" element={ <ListOrders/> } />
          <Route path="order/:id" element={ <ListSingleOrder/> } />
          <Route path="create" element={ <CreateOrder/> } />
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
