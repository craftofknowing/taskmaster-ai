"use client";
import AuthForm from "@/components/AuthForm/AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData: {
    username: string;
    password: string;
    role: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "login failed");
      }

      const data = await response.json();
      console.log("login successful:", data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          role: data.role,
          id: data.id,
        })
      );
      router.push("/taskview");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      onSubmit={handleSignup}
      error={error}
      isLoading={isLoading}
    />
  );
}
