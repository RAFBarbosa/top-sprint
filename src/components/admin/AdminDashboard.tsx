// src/components/admin/AdminDashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import Sidebar from "./Sidebar";
import LogoutIcon from "@mui/icons-material/Logout";

export function AdminDashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		// Firebase way to check auth state
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				navigate("/admin");
			}
		});

		return () => unsubscribe(); // Cleanup subscription
	}, [navigate]);

	const handleLogout = async () => {
		try {
			await auth.signOut(); // Proper Firebase logout
			navigate("/admin");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};
	const user = auth.currentUser;

	return (
		<div className="mx-auto p-6 w-full mt-25">
			<div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
				<div>
					<h1 className="text-2xl font-bold mb-2">
						Painel Administrador
					</h1>
					<p>Bem vindo ao painel Top Sprint, {user?.email}</p>
				</div>
				<button
					onClick={handleLogout}
					className="px-4 py-2 bg-f1-red text-white rounded border border-f1-red hover:bg-transparent hover:text-f1-black cursor-pointer duration-120 flex"
				>
					Sair
					<LogoutIcon className="inline-block scale-70" />
				</button>
			</div>
			<div className="">
				<Sidebar />
			</div>
		</div>
	);
}
