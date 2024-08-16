import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import Preview from "./components/Preview";
import Submitted from "./components/Submitted";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
};

export default App;
