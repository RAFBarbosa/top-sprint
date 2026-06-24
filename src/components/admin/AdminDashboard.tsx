// src/components/admin/AdminDashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import Sidebar from "./Sidebar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { useToast } from "../../contexts/ToastContext";

export function AdminDashboard() {
	const navigate = useNavigate();
	const { name } = useTenantConfig();
	const { showToast } = useToast();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				navigate("/admin");
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	const handleLogout = async () => {
		try {
			await auth.signOut();
			navigate("/admin");
		} catch (error) {
			showToast("error", "Erro ao sair");
		}
	};
	const user = auth.currentUser;

	return (
		<div className="mx-auto p-4 md:p-6 w-full mt-4 md:mt-8">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8 border-b border-gray-300 pb-4">
				<div className="min-w-0">
					<h1 className="text-xl md:text-2xl font-bold mb-1">
						Painel Administrador
					</h1>
					<p className="text-sm text-gray-500 truncate">
						{name} · {user?.email}
					</p>
				</div>
				<div className="flex gap-2 shrink-0">
					<button
						onClick={() => navigate("/")}
						className="px-3 py-1.5 md:px-4 md:py-2 bg-transparent text-f1-black rounded border border-gray-400 hover:border-f1-red hover:text-f1-red cursor-pointer duration-120 flex items-center gap-1 text-sm"
					>
						← Site
					</button>
					<button
						onClick={handleLogout}
						className="px-3 py-1.5 md:px-4 md:py-2 bg-f1-red text-white rounded border border-f1-red hover:bg-transparent hover:text-f1-black cursor-pointer duration-120 flex items-center text-sm"
					>
						Sair
						<LogoutIcon className="inline-block scale-70" />
					</button>
				</div>
			</div>
			<div className="">
				<Sidebar />
			</div>
		</div>
	);
}
