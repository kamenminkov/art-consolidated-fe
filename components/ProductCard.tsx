import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Link href={`/products/${product.id}`}>
			<article className="w-full rounded-sm  bg-white dark:bg-zinc-900 shadow-md dark:shadow-black overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
				<Image
					width={200}
					height={100}
					src={product.thumbnail}
					alt={product.title}
					className="h-48 w-full object-cover"
					loading="lazy"
				/>
				<div className="p-4">
					<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
						{product.title}
					</h3>

					<div className="mt-3 flex items-center justify-between">
						<span className="flex items-center gap-2">
							<span className="text-sm font-medium text-emerald-600">
								$
								{(
									product.price *
									(1 - (product.discountPercentage || 0) / 100)
								).toFixed(2)}
							</span>
							{product.discountPercentage > 0 && (
								<>
									<span className="text-xs text-zinc-400 line-through">
										${product.price.toFixed(2)}
									</span>
									<span className="ml-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-2 py-0.5 rounded-full text-xs font-semibold">
										-{product.discountPercentage.toFixed(0)}%
									</span>
								</>
							)}
						</span>
						<div className="flex items-center text-xs text-zinc-500">
							<svg
								className="h-4 w-4 text-amber-400"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L19.334 24 12 19.897 4.666 24l1.634-8.694L.6 9.75l7.732-1.732L12 .587z" />
							</svg>
							<span className="ml-1">
								{product?.rating ? product.rating.toFixed(1) : "N/A"}
							</span>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
}
