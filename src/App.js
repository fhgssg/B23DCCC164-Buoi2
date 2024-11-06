import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import ItemList from "./components/ItemList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />{" "}
        {/* Route cho chỉnh sửa */}
      </Routes>
    </Router>
  );
};

export default App;
