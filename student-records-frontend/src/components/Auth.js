import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer
import { Bounce } from "react-toastify"; // Import Bounce transition

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Logged in successfully!"); // Success message on successful login
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Account created successfully!"); // Success message on successful signup
      }
      setUser(userCredential.user);
    } catch (error) {
      toast.error("Invalid email or Password. Please try again!"); // Error message for failed login
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      toast.success("Logged in successfully!"); // Success message for Google login
    } catch (error) {
      toast.error(error.message); // Error message for Google login failure
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        😊 Welcome to <br />
        <span style={styles.brand}>NoteMaker! 👋</span>
      </h1>
      <div style={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.box1}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.box1}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.loginButton}>
            {isLogin ? "Login!" : "Sign Up!"}
          </button>
        </form>
        {isLogin && (
          <p onClick={handleForgotPassword} style={styles.forgotPassword}>
            Forgot Password?? <u>Click here</u> 
          </p>
        )}
        <button onClick={handleGoogleLogin} style={styles.googleButton}>
          <img
            src="/GOOGLE icon.png"
            alt="Google Logo"
            style={styles.googleLogo}
          />
          Continue with Google
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
          {isLogin
            ? "Don't have an account? Signup!"
            : "Already have an account? Login"}
        </p>
      </div>

      {/* Toast Container to show notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

const styles = {
  mainContainer: {
    width: "30%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#FEFFB0", // Yellow background
  },
  googleLogo: {
    width: "40px", // Adjust the size as needed
    height: "40px",
    marginRight: "10px",
  },
  header: {
    fontSize: "3rem", // Increased header size
    textAlign: "center",
    marginBottom: "20px", // Space between header and form
  },
  brand: {
    fontWeight: "900",
    fontSize: "5rem",
  },
  label: {
    fontFamily: "monospace", // Monospace font for labels
    fontSize: "1.5rem", // Adjust size if needed
    fontWeight: "bold",
    marginBottom: "1px", // Adds spacing below labels
    display: "block", // Ensures labels appear above inputs
  },
  input: {
    width: "100%",
    height: "100px",
    padding: "10px",
    margin: "1px 0", // Add spacing between inputs
    borderRadius: "10px",
    border: "1px solid black",
    backgroundColor: "#FFFFFF",
    color: "black",
    fontSize: "3rem",
    fontFamily: "monospace",
    boxShadow: "10px 10px 0px black",
    outline: "none",
  },
  loginButton: {
    border: "3px solid black",
    borderRadius: "10px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50", // Green button
    color: "white",
    fontSize: "3rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "30px",
    boxShadow: "10px 10px 0px black",
    height: "100px",
    fontFamily: "monospace",
  },
  googleButton: {
    border: "3px solid black",
    borderRadius: "10px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#DB4437", // Red Google button
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "10px 10px 0px black",
    height: "100px",
    fontFamily: "monospace",
  },
  forgotPassword: {
    fontFamily: "monospace",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center", // Centering the text
  },
  toggle: {
    fontFamily: "monospace",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
    marginTop: "15px",
    textAlign: "center", // Centering the text
  },
  box1: {
    marginTop: "30px",
  },
};

export default Auth;
