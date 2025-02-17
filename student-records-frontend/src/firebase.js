import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTfvY50W6FQFgn6QIZY8EWhX2ARvt5eBQ",
    authDomain: "student-records-7b0b1.firebaseapp.com",
    projectId: "student-records-7b0b1",
    storageBucket: "student-records-7b0b1.firebasestorage.app",
    messagingSenderId: "300839752530",
    appId: "1:300839752530:web:235523815c82ca8684a08b",
    measurementId: "G-HS8BBCJPF6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
