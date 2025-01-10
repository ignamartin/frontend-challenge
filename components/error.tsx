"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Error({
  message,
  reset,
}: {
  message?: string;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Error</h1>
      <p className="mb-4">
        {message || "Por favor, inténtelo de nuevo más tarde."}
      </p>
      <div className="space-x-4">
        <Button
          onClick={() => reset()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Intentar nuevamente
        </Button>
        <Link href="/" className="text-blue-500 hover:underline">
          Volver
        </Link>
      </div>
    </div>
  );
}
