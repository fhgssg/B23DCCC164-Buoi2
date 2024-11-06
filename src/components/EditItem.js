import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateItem } from "../store/itemSlice";

const EditItem = () => {
  const { id } = useParams();
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemToEdit = items.find((item) => item.id === parseInt(id));

  const [name, setName] = useState(itemToEdit?.name || "");
  const [price, setPrice] = useState(itemToEdit?.price || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!itemToEdit) {
      navigate("/");
    }
  }, [itemToEdit, navigate]);

  const handleEditItem = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError("Vui lòng điền vào tất cả các trường");
      return;
    }
    setError("");
    dispatch(updateItem({ id: itemToEdit.id, name, price }));
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chỉnh Sửa Hàng Hóa</h1>
      <form onSubmit={handleEditItem}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.addButton}>
          Lưu Thay Đổi
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

export default EditItem;
