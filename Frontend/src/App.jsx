import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "./RegistrationForm";
import { Provider } from 'react-redux'; 
import store from './store'; 
import LoginForm from "./LoginForm";
import UserDetails from "./UserDetails";
import UserHome from "./UserHome";
import TradeDashboard from "./TradeDashboard";
import HomePage from "./HomePage";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <div className="App">
        <Routes>
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/tradeDashboard" element={<TradeDashboard />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        
      </div>
    </Router>
    </Provider>

  );
};

export default App;
