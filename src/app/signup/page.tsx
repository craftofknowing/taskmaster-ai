"use client";

import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployee, setIsEmployee] = useState(false); // State for employee checkbox
  const [isManager, setIsManager] = useState(false); // State for manager checkbox
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Determine the role based on checkbox selection
    let role = "";
    if (isEmployee && isManager) {
      role = "employee,manager"; // Both selected (adjust as needed)
    } else if (isEmployee) {
      role = "employee";
    } else if (isManager) {
      role = "manager";
    } else {
      role = ""; // Or set a default, or show an error
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        // Use your FastAPI base URL
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Important for Form data
        },
        body: new URLSearchParams({
          // Convert to form data
          username: username,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // "User created successfully"
        // Handle successful signup (e.g., redirect, store token)
        console.log("Signup successful:", data);
      } else {
        setMessage(data.detail || "Signup failed"); // Show error from FastAPI
        console.error("Signup error:", data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Error: " + error.message);
        console.error("Error:", error.message);
      } else {
        setMessage("An unexpected error occurred.");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <label>
          <input
            type="checkbox"
            checked={isEmployee}
            onChange={(e) => setIsEmployee(e.target.checked)}
          />
          Employee
        </label>
        <label>
          <input
            type="checkbox"
            checked={isManager}
            onChange={(e) => setIsManager(e.target.checked)}
          />
          Manager
        </label>
      </div>
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
