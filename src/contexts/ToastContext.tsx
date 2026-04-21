import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
	id: number;
	type: ToastType;
	message: string;
}

interface ToastContextValue {
	showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}

const DURATION_MS = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = useCallback((type: ToastType, message: string) => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, { id, type, message }]);
	}, []);

	const dismiss = useCallback((id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
				{toasts.map((t) => (
					<ToastItem key={t.id} toast={t} onDismiss={dismiss} />
				))}
			</div>
		</ToastContext.Provider>
	);
}

function ToastItem({
	toast,
	onDismiss,
}: {
	toast: Toast;
	onDismiss: (id: number) => void;
}) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const enterTimer = setTimeout(() => setVisible(true), 10);
		const exitTimer = setTimeout(() => setVisible(false), DURATION_MS - 300);
		const removeTimer = setTimeout(() => onDismiss(toast.id), DURATION_MS);
		return () => {
			clearTimeout(enterTimer);
			clearTimeout(exitTimer);
			clearTimeout(removeTimer);
		};
	}, [toast.id, onDismiss]);

	const styles =
		toast.type === "success"
			? "bg-green-600 border-green-700 text-white"
			: toast.type === "error"
				? "bg-red-600 border-red-700 text-white"
				: "bg-blue-600 border-blue-700 text-white";

	return (
		<div
			className={`pointer-events-auto min-w-[280px] max-w-md px-4 py-3 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300 ${styles} ${
				visible
					? "opacity-100 translate-x-0"
					: "opacity-0 translate-x-4"
			}`}
			role="status"
			onClick={() => onDismiss(toast.id)}
		>
			{toast.message}
		</div>
	);
}
