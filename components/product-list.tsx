"use client";

import Loading from "@/components/loading";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { getProducts } from "@/app/api/api";
import { translateMessage } from "@/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { ref, inView } = useInView();

  const fetchProjects = async ({ pageParam = 1 }) => {
    const response = await getProducts(pageParam);
    return response;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts = data?.pages
    .flatMap((page) => page.data)
    .filter((product) => {
      if (!debouncedSearch) return true;
      if (!isNaN(Number(debouncedSearch))) {
        return product.sku.toString().includes(debouncedSearch);
      } else {
        return product.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
      }
    });

  return (
    <>
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por SKU o nombre del producto..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 py-6 text-lg rounded-xl border-2 border-blue-500 focus:border-opacity-0"
          />
        </div>
      </div>
      {status === "pending" && <Loading />}
      {status === "error" && (
        <div className="text-center py-12">
          <p className="text-md">{translateMessage(error.message)}</p>
        </div>
      )}
      {status === "success" && filteredProducts?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No se encontraron productos
          </h2>
          <p className="text-md">Intenta buscar con otros términos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}
      <div ref={ref}>{isFetchingNextPage ? <Loading /> : null}</div>
      {!hasNextPage && (filteredProducts?.length ?? 0) > 0 && (
        <h2 className="text-center text-2xl font-semibold text-gray-900 my-8">
          No hay más productos disponibles
        </h2>
      )}
    </>
  );
}
