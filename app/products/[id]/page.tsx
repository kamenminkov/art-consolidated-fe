import Image from "next/image";
import { Product } from "../../../types/product";

interface ProductDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

async function getProductDetails(id: string): Promise<Product> {
	const res = await fetch(`https://dummyjson.com/products/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch product details");
	}

	return res.json();
}

export default async function ProductDetailsPage({
	params,
}: ProductDetailsPageProps) {
	const product = await getProductDetails((await params).id);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4">
			<div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
					{/* Main Image */}
					<div className="flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
						<Image
							src={product.thumbnail}
							alt={product.title}
							width={400}
							height={400}
							className="w-full h-full object-cover"
							priority
						/>
					</div>

					{/* Product Details */}
					<div className="flex flex-col justify-between">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
								{product.title}
							</h1>

							{/* Rating */}
							<div className="flex items-center gap-2 mb-6">
								<div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
									<svg
										className="h-5 w-5 text-amber-400"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.334 24 12 19.897 4.666 24l1.634-8.694L.6 9.75l7.732-1.732L12 .587z" />
									</svg>
									<span className="ml-2">
										{product?.rating ? product.rating.toFixed(1) : "N/A"}
									</span>
								</div>
							</div>

							{/* Description */}
							<p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
								{product.description}
							</p>
						</div>

						{/* Price Section */}
						<div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
							<div className="flex items-baseline gap-3 mb-6">
								<span className="text-4xl font-bold text-emerald-600">
									$
									{(
										product.price *
										(1 - (product.discountPercentage || 0) / 100)
									).toFixed(2)}
								</span>
								{product.discountPercentage > 0 && (
									<>
										<span className="text-xl text-zinc-400 line-through">
											${product.price.toFixed(2)}
										</span>
										<span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-3 py-1 rounded-full text-sm font-semibold">
											-{product.discountPercentage.toFixed(0)}%
										</span>
									</>
								)}
							</div>

							<button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors">
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
