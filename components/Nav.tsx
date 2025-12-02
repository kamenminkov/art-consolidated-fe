import Link from "next/link";

export default function Nav() {
	return (
		<header className="w-full bg-white dark:bg-zinc-900 border-b">
			<nav className="max-w-4xl mx-auto p-4 flex items-center gap-4">
				<Link href="/" className="text-emerald-600 hover:underline">
					Home
				</Link>
				<Link href="/cart" className="ml-auto text-emerald-600 hover:underline">
					Cart
				</Link>
			</nav>
		</header>
	);
}
