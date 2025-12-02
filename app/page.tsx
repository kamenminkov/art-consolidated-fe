import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

export default async function Home() {
	const res = await fetch("https://dummyjson.com/products", {
		next: { revalidate: 60 },
	});
	const data = await res.json();
	const products: Product[] = data?.products ?? [];

	return (
		<div className="flex min-h-screen items-center justify-center font-sans bg-zinc-50  dark:bg-neutral-800">
			<main className="w-full max-w-6xl py-16 px-6">
				<h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
					Products
				</h1>
				<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</section>
			</main>
		</div>
	);
}
