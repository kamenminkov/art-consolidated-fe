"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
	const {
		items,
		removeItem,
		updateQuantity,
		totalQuantity,
		totalPrice,
		clear,
	} = useCart();

	if (items.length === 0)
		return (
			<div className="min-h-screen flex items-center justify-center p-8">
				<div className="text-center">
					<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
					<Link href="/" className="text-emerald-600">
						Go shopping
					</Link>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg p-6">
				<h1 className="text-2xl font-semibold mb-4">
					Cart ({totalQuantity} items)
				</h1>

				<ul className="space-y-4">
					{items.map((it) => (
						<li key={it.id} className="flex items-center gap-4">
							<div className="w-24 h-24 relative rounded overflow-hidden bg-gray-100">
								<Image
									src={it.thumbnail}
									alt={it.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex-1">
								<h3 className="font-semibold">{it.title}</h3>
								<div className="text-sm text-zinc-500">
									$
									{(
										it.price *
										(1 - (it.discountPercentage || 0) / 100)
									).toFixed(2)}{" "}
									each
								</div>
							</div>

							<div className="flex items-center gap-2">
								<input
									aria-label="Quantity"
									placeholder=""
									type="number"
									min={1}
									value={it.quantity}
									onChange={(e) =>
										updateQuantity(it.id, Math.max(1, Number(e.target.value)))
									}
									className="w-16 px-2 py-1 border rounded text-center"
								/>
								<button
									type="button"
									onClick={() => removeItem(it.id)}
									className="text-red-600 hover:underline text-sm"
								>
									Remove
								</button>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-6 border-t pt-4 flex items-center justify-between">
					<div>
						<div className="text-sm text-zinc-500">Total items</div>
						<div className="text-lg font-semibold">{totalQuantity}</div>
					</div>
					<div className="text-right">
						<div className="text-sm text-zinc-500">Total price</div>
						<div className="text-lg font-semibold">
							${totalPrice.toFixed(2)}
						</div>
					</div>
				</div>

				<div className="mt-4 flex gap-3">
					<button
						type="button"
						onClick={() => clear()}
						className="px-4 py-2 border rounded"
					>
						Clear cart
					</button>
					<button
						type="button"
						className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded"
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
}
