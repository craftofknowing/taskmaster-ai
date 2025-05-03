"use client";

import React, { useState } from "react";

interface AuthFormProps {
  title: string;
  onSubmit: (formData: {
    username: string;
    password: string;
    role: string;
  }) => void | Promise<void>;
  error?: string | null;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  error = null,
  isLoading = false,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ username, password, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141a22] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-center text-lg font-semibold text-gray-700">
          Taskmaster AI
        </p>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#141a22] disabled:opacity-70"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#141a22] disabled:opacity-70"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#141a22] disabled:opacity-70"
        >
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#141a22] text-white py-3 rounded hover:bg-gray-700 transition font-semibold ${
            isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
