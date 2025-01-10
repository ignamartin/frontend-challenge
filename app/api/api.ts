import { Product, ProductDetails } from "../../lib/types";

const API_URL = process.env.API_URL_SERVER || "http://localhost:5000";

export async function getProducts(
  pageParam: number = 1,
  limit: number = 20
): Promise<{ data: Product[]; next: number | null }> {
  const url = new URL(`${API_URL}/products`);
  url.searchParams.append("_page", pageParam.toString());
  url.searchParams.append("_per_page", limit.toString());
  const response = await fetch(url.toString());
  const result = await response.json();
  return {
    data: result.data,
    next: result.next,
  };
}

export async function getProductDetails(
  sku: string
): Promise<ProductDetails[]> {
  const response = await fetch(`${API_URL}/products?sku=${sku}`);
  return response.json();
}
