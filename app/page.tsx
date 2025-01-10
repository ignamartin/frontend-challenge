import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-[1366px]">
      <h1 className="text-3xl font-bold mb-4">Buscador de productos</h1>
      <ProductList />
    </main>
  );
}
