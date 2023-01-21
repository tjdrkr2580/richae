import Footer from "@components/Footer";
import Header from "@components/Header";
import Home from "@pages/Home";
import GlobalStyled from "@utils/GlobalStyled";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyled />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
