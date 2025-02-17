import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ItemList from "./components/ItemList"; // New ItemList Component

function App() {
    const [user, setUser] = useState(null);

    // Listen to user authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                console.log("User logged out successfully");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    if (!user) {
        return <Auth setUser={setUser} />;
    }

    return (
        <div>
            <Navbar onLogout={handleLogout} />
            <ItemList user={user} /> {/* Pass the user prop to ItemList */}
        </div>
    );
}

export default App;
