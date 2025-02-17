import axios from "axios";

const API_URL = "http://localhost:8080/items";

export const getItems = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`);
};

// Create a new item
export const createItem = (item) => {
    return axios.post(API_URL, item);
};

// Delete an item by ID
export const deleteItem = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// Update an existing item
export const updateItem = (id, updatedItem) => {
    return axios.put(`${API_URL}/${id}`, updatedItem);
};
