import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemForm = ({ addItem }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      addItem({ name, description });
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-6 p-4 border rounded shadow bg-light">
        <h2 className="mb-4 text-center text-primary">Add Item</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg w-100">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;