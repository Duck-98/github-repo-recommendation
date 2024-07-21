"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

import { Suspense } from "@suspensive/react";
import { Loading } from "../components/loading";

export default function LoginPage() {
  //   useEffect(() => {
  //     signIn("github");
  //   }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="card shadow-lg p-6 bg-white rounded flex items-center">
          <h1 className="text-2xl font-bold mb-4">로그인</h1>
          <button onClick={() => signIn("github")} className="btn btn-primary">
            Github로 시작하기 <FaGithub />
          </button>
        </div>
      </div>
    </Suspense>
  );
}
