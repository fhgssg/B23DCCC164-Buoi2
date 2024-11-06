import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../store/itemSlice";

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError("Vui lòng điền vào tất cả các trường");
      return;
    }
    setError("");
    dispatch(addItem({ name, price }));
    navigate("/");
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thêm Hàng Hóa</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={handleInputChange(setName)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={handleInputChange(setPrice)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.addButton}>
          Thêm hàng hóa
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={styles.backButton}
        >
          Quay Lại
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px 30px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  addButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  backButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AddItem;
