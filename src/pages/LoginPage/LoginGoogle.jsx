import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Cấu hình Firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyAViS9nATeNRnFJMjMLsesry0gOu8lVZl0", // Replace with your API key
  authDomain: "jiraclone-a750e.firebaseapp.com", // Replace with your authDomain
  projectId: "jiraclone-a750e", // Replace with your projectId
  storageBucket: "jiraclone-a750e.appspot.com", // Replace with your storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your messagingSenderId
  appId: "YOUR_APP_ID", // Replace with your appId
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const App = () => {
  const handleGoogleLogin = async () => {
    try {
      // Đăng nhập bằng Google
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Google ID Token:", token);

      // Gửi ID token đến server API
      const response = await fetch(
        "http://weblearn.ddns.net:4001/api/login/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        alert("Login successful!");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Error during login. Check console for details.");
    }
  };

  return (
    <div>
      <h1>Login with Google using Firebase</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default App;
