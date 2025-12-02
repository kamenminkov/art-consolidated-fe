"use client";
import { Product } from "../types/product";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ product }: { product: Product }) {
	const { addItem } = useCart();
	return (
		<button
			onClick={() => addItem(product, 1)}
			className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
			type="button"
		>
			Add to Cart
		</button>
	);
}
