import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests

function Item({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    description: item.description,
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

  // Handler for toggling edit mode
  const handleEditClick = (e) => {
    e.stopPropagation();
  
    if (isEditing) {
      // When editing, save the changes by making an API call
      axios
        .put(`http://localhost:8080/items/${item.id}`, {
          ...editedItem,
          id: item.id,
          userId: item.userId,
        })
        .then((response) => {
          console.log("Item updated:", response.data);
          if (onEdit) {
            onEdit(item.id, response.data); // Update the parent component with the new data
          }
          setIsEditing(false); // Exit edit mode after saving
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    } else {
      setIsEditing(true); // Enter edit mode
    }
  };

  // Handler for delete button
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  // Confirm delete action
  const confirmDelete = () => {
    onDelete(item.id); // Call the onDelete function passed from the parent
    setShowDeleteModal(false); // Close the delete confirmation modal
    setShowModal(false); // Close the expand modal if it's open
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the delete confirmation modal
  };

  // Close the modal
  const closeModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  // Toggle modal size for expanded view
  const toggleModalSize = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Card View */}
      <div style={styles.card}>
        <div style={styles.buttonContainer}>
          {/* Delete Button */}
          <button style={styles.deleteButton} onClick={handleDeleteClick}>
            <img
              src="/deleteicon.png"
              alt="Delete Icon"
              style={styles.deleteIcon}
            />
          </button>

          {/* Edit Button with Icon */}
          <button style={styles.editButton} onClick={handleEditClick}>
            <img
              src={isEditing ? "/saveicon.png" : "/editicon.png"} // Use icons for edit/save
              alt={isEditing ? "Save" : "Edit"}
              style={styles.editIcon}
            />
          </button>

          {/* Expand Button with Icon */}
          <button style={styles.expandButton} onClick={toggleModalSize}>
            <img
              src={showModal ? "/collapseicon.png" : "/expandicon.png"}
              alt={showModal ? "Collapse" : "Expand"}
              style={styles.icon}
            />
          </button>
        </div>
        <div style={styles.textContainer}>
          <h4 style={styles.itemName}>
            {isEditing ? (
              <input
                type="text"
                value={editedItem.name}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, name: e.target.value })
                }
                style={styles.input}
              />
            ) : (
              item.name
            )}
          </h4>
          <p style={styles.itemDescription}>
            {isEditing ? (
              <textarea
                value={editedItem.description}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    description: e.target.value,
                  })
                }
                style={styles.textarea}
              />
            ) : (
              item.description
            )}
          </p>
        </div>
      </div>

      {/* Modal Popup for Detailed View */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>
              {isEditing ? (
                <input
                  type="text"
                  value={editedItem.name}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, name: e.target.value })
                  }
                  style={styles.modalInput}
                />
              ) : (
                item.name
              )}
            </h2>
            <p>
              {isEditing ? (
                <textarea
                  value={editedItem.description}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      description: e.target.value,
                    })
                  }
                  style={styles.modalTextarea}
                />
              ) : (
                item.description
              )}
            </p>
            <div style={styles.modalButtonContainer}>
              <button style={styles.deleteButton} onClick={handleDeleteClick}>
                <img
                  src="/deleteicon.png"
                  alt="Delete Icon"
                  style={styles.deleteIcon}
                />
              </button>
              <button style={styles.editButton} onClick={handleEditClick}>
                <img
                  src={isEditing ? "/saveicon.png" : "/editicon.png"} // Use icons for edit/save
                  alt={isEditing ? "Save" : "Edit"}
                  style={styles.editIcon}
                />
              </button>
              <button style={styles.closeButton} onClick={closeModal}>
              <img
                  src="/collapseicon.png" // Use icons for edit/save
                  alt="close"
                  style={styles.editIcon}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={styles.modalOverlay} onClick={cancelDelete}>
          <div style={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure you want to delete this note?</h2>
            <div style={styles.deleteModalButtonContainer}>
              <button style={styles.confirmButton} onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button style={styles.cancelButton} onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  card: {
    border: "3px solid black",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "10px 10px 0px 0px black",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    marginBottom: "20px",
    minHeight: "12rem", // Ensure the card has enough height to fit buttons
  },
  textContainer: {
    width: "100%",
    marginTop: "2.5rem", // Add margin to push text below the buttons
  },
  itemName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  itemDescription: {
    fontSize: "1rem",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    fontSize: "1.2rem",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  textarea: {
    fontSize: "1rem",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    height: "80px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row", // Align buttons horizontally
    gap: "10px", // Adds spacing between buttons
    position: "absolute", // Position buttons absolutely
    top: "10px", // Align to top
    left: "10px", // Align to left
  },
  expandButton: {
    backgroundColor: "rgb(137 212 0)", // Blue background
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",  // Reduced padding to half
    cursor: "pointer",
    boxShadow: "2px 2px 0px black",
  },
  editButton: {
    backgroundColor: "#1890ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",  // Reduced padding to half
    cursor: "pointer",
    boxShadow: "2px 2px 0px black",
  },
  deleteButton: {
    backgroundColor: "#FF4D4D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",  // Reduced padding to half
    cursor: "pointer",
    boxShadow: "2px 2px 0px black",
  },
  editIcon: {
    width: "20px",
    height: "20px",
  },
  deleteIcon: {
    width: "20px",
    height: "20px",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px", // Increased padding for larger modal
    borderRadius: "10px",
    maxWidth: "700px", // Increased max-width for a bigger modal
    width: "90%",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
  },
  deleteModalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  deleteModalButtonContainer: {
    display: "flex",
    justifyContent: "flex-start", // Align buttons to the left
    gap: "10px",
    marginTop: "20px",
  },
  confirmButton: {
    backgroundColor: "#FF4D4D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#888",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  modalInput: {
    fontSize: "1.5rem",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  },
  modalTextarea: {
    fontSize: "1rem",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    height: "100px",
    marginBottom: "10px",
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "flex-start", // Align buttons to the left
    gap: "10px",
  },
  closeButton: {
    backgroundColor: "rgb(137 212 0)", // Blue background
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",  // Reduced padding to half
    cursor: "pointer",
    boxShadow: "2px 2px 0px black",
  },
};

export default Item;