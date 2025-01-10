"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

export default function GlobalError() {
  const inter = Inter({ subsets: ["latin"] });

  const reset = () => {
    window.location.reload();
  };

  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p className="mb-4">Por favor, inténtelo de nuevo</p>
          <div className="space-x-4">
            <Button
              onClick={() => reset()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Intentar nuevamente
            </Button>
            <Link href="/" className="text-blue-500 hover:underline">
              Volver a la página de inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
