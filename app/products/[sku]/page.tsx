/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getProductDetails } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProductDetails } from "@/lib/types";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function ProductPage() {
  const { sku } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getProduct = async () => {
    try {
      const data = await getProductDetails(sku as string);

      if (Array.isArray(data) && data.length > 0) {
        setProduct(data[0]);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (error) {
    return <Error reset={() => getProduct()} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-2xl mx-auto">
          <Link href="/" passHref>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista
            </Button>
          </Link>

          <Card className="overflow-hidden">
            <CardHeader className="bg-stone-200 border-b">
              <CardTitle className="text-3xl font-bold">
                {product?.name.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src={product?.image || "/default-image.jpg"}
                    alt={product?.name || "Product Image"}
                    width={250}
                    height={280}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg">
                    <span className="font-semibold">Marca:</span>{" "}
                    {product?.brand}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Categoría:</span>{" "}
                    {product?.category.name}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">SKU:</span> {product?.sku}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ${product?.price.toFixed(2)}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Especificaciones
                    </h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {product?.specifications.map((spec, index) => (
                        <li key={index}>
                          {spec.name}: {spec.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
