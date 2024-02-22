import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

//***** REDUX *****
// import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import Home from "./pages/Home/Home";

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>

  // <Provider store={store}>
  //   <App />
  // </Provider>
);
