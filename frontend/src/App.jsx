import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DisplayRecords from "./pages/DisplayRecords";
import RecordForm from "./components/RecordForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<DisplayRecords />} />
          <Route path="/add" element={<RecordForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
