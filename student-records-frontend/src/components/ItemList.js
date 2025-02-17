import React, { useState, useEffect } from "react";
import Item from "./Item";
import { createItem, deleteItem, getItems, updateItem } from "../api";

function ItemList({ user }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  // Fetch items when user is authenticated
  useEffect(() => {
    if (user) {
      getItems(user.uid).then((response) => setItems(response.data));
    }
  }, [user]);

  const handleCreate = () => {
    const itemWithUserId = { ...newItem, userId: user.uid };
    createItem(itemWithUserId).then((response) =>
      setItems([...items, response.data])
    );
    setNewItem({ name: "", description: "" });
  };

  const handleDelete = (id) => {
    deleteItem(id).then(() =>
      setItems(items.filter((item) => item.id !== id))
    );
  };

  // Handle editing an item
  const handleEdit = (id, updatedItem) => {
    updateItem(id, updatedItem).then((response) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? response.data : item))
      );
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.intro}>Welcome 👋, {user.email}!</h1>
      <h2 style={styles.heading}>Now make your notes 📝 !</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Header"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.target.value })
          }
        />
        <textarea
          style={styles.descriptionInput}
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button style={styles.button} onClick={handleCreate}>
          Add Item
        </button>
      </div>

      {/* Masonry-like layout using CSS columns */}
      <div style={styles.itemList}>
        {items.map((item) => (
          <div key={item.id} style={styles.itemWrapper}>
            <Item item={item} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  intro: {
    marginTop: "4rem",
    fontSize: "2.5rem",
    fontWeight: "600",
  },
  container: {
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FEFFB0",
    minHeight: "100vh",
    paddingBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
    alignItems: "center",
  },
  input: {
    padding: "15px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    width: "300px",
    boxShadow: "10px 10px black",
    margin :"5px 0px"
  },
  descriptionInput: {
    padding: "15px",
    fontSize: "1.2rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    width: "300px",
    height: "150px",
    boxShadow: "10px 10px black",
    resize: "none",
    margin :"5px 0px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1890FF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "300px",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    boxShadow: "10px 10px black",
    margin :"5px 0px"
  },
  itemList: {
    columnCount: 3,
    columnGap: "20px",
    width: "75%",
    padding: "20px",
  },
  itemWrapper: {
    breakInside: "avoid",
    marginBottom: "20px",
  },
};

export default ItemList;