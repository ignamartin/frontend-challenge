import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-[320px] p-2 transition-transform hover:scale-105 hover:shadow-lg duration-200">
      <div className="aspect-auto relative overflow-hidden rounded-t-lg flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={280}
          className="object-cover rounded-lg"
        />
        <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
          {product.category.name}
        </Badge>
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-gray-900">
              {product.name}
            </CardTitle>
            <p className="text-sm">Marca: {product.brand}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm">SKU: {product.sku}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.sku}`} className="w-full">
          <Button className="w-full group-hover:bg-primary/90 transition-colors">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
