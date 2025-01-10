import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">No encontramos la página que estás buscando.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Volver a la lista de productos
      </Link>
    </div>
  );
}
