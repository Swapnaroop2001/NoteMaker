import React from "react";

export default function Navbar({ onLogout }) {
  const handleReload = (e) => {
    e.preventDefault(); // Prevent default link behavior
    window.location.reload();
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ border: "4px solid black", boxShadow:"0px 2px black" }} // Black border added here
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            onClick={handleReload}
            style={{ fontFamily: "monospace", fontSize: "1.5rem", fontWeight: "600" }}
          >
            NoteMaker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-white d-flex align-items-center gap-2"
          onClick={onLogout} // Add the logout function here
          style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: "600",cursor:"pointer" }}
        >
          <span>Logout</span>
          <img
            src="/logouticon.png"
            alt="Logout Icon"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </nav>
    </div>
  );
}
