"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Loading } from "../components/loading";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("github", {
      callbackUrl: `/`,
    });
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="card shadow-lg p-6 bg-white rounded flex items-center">
          <h1 className="text-2xl font-bold mb-4">로그인</h1>
          <button onClick={handleLogin} className="btn btn-primary">
            Github로 시작하기 <FaGithub />
          </button>
        </div>
      )}
    </div>
  );
}
