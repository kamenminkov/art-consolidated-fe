"use client";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Product } from "../types/product";

type CartItem = Product & { quantity: number };

type CartContextType = {
	items: CartItem[];
	addItem: (product: Product, qty?: number) => void;
	removeItem: (id: number) => void;
	updateQuantity: (id: number, qty: number) => void;
	clear: () => void;
	totalQuantity: number;
	totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items]);

	const addItem = (product: Product, qty = 1) => {
		setItems((prev) => {
			const existing = prev.find((p) => p.id === product.id);
			if (existing) {
				return prev.map((p) =>
					p.id === product.id ? { ...p, quantity: p.quantity + qty } : p,
				);
			}
			return [...prev, { ...product, quantity: qty }];
		});
	};

	const removeItem = (id: number) => {
		setItems((prev) => prev.filter((p) => p.id !== id));
	};

	const updateQuantity = (id: number, qty: number) => {
		if (qty <= 0) return removeItem(id);
		setItems((prev) =>
			prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)),
		);
	};

	const clear = () => setItems([]);

	const totals = useMemo(() => {
		const totalQuantity = items.reduce((s, it) => s + it.quantity, 0);
		const totalPrice = items.reduce((s, it) => {
			const discounted = it.price * (1 - (it.discountPercentage || 0) / 100);
			return s + discounted * it.quantity;
		}, 0);
		return { totalQuantity, totalPrice };
	}, [items]);

	const value: CartContextType = {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clear,
		totalQuantity: totals.totalQuantity,
		totalPrice: totals.totalPrice,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
