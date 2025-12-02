"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Nav() {
	const { totalQuantity } = useCart();

	return (
		<header className="w-full bg-white dark:bg-zinc-900 border-b">
			<nav className="max-w-4xl mx-auto p-4 flex items-center gap-4">
				<Link href="/" className="text-emerald-600 hover:underline">
					Home
				</Link>

				<div className="ml-auto">
					<Link
						href="/cart"
						aria-label="Cart"
						className="relative inline-flex items-center p-1"
					>
						{/* cart SVG */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6 text-zinc-700 dark:text-zinc-200"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
							/>
						</svg>

						{totalQuantity > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
								{totalQuantity}
							</span>
						)}
					</Link>
				</div>
			</nav>
		</header>
	);
}
