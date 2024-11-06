import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem } from "../store/itemSlice";

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Danh Sách Hàng Hóa</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm hàng hóa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "300px",
            height: "35px",
            fontSize: "16px",
            padding: "5px",
            marginRight: "10px",
          }}
        />
        <Link to="/add-item">
          <button
            style={{
              height: "45px",
              fontSize: "16px",
              padding: "0 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Thêm Hàng Hóa
          </button>
        </Link>
      </div>
      {displayedItems.length === 0 ? (
        <p>Không tìm thấy hàng hóa nào!</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, marginLeft: "10px" }}>
          {displayedItems.map((item, index) => (
            <li
              key={index}
              style={{
                padding: "10px 0",
                fontSize: "18px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {item.name} - {item.price} VND
              </span>
              <div>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Xoá
                </button>
                <Link to={`/edit-item/${item.id}`}>
                  <button
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Chỉnh sửa
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            height: "50px",
            backgroundColor: currentPage === 1 ? "#D3D3D3" : "#1E90FF",
            color: currentPage === 1 ? "#A9A9A9" : "white",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            borderRadius: "5px",
          }}
        >
          Trang trước
        </button>
        <span style={{ fontSize: "18px", margin: "0 15px" }}>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            height: "50px",
            backgroundColor: currentPage === totalPages ? "#D3D3D3" : "#1E90FF",
            color: currentPage === totalPages ? "#A9A9A9" : "white",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            borderRadius: "5px",
          }}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ItemList;
