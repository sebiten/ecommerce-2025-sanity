import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
