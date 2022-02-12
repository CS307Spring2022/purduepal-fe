import React from "react";
import "./App.css";
import { Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PurduePAL Frontend</p>

        <Button href="/" variant="contained">
          Learn React
        </Button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
