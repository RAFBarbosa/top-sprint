import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthChange } from "./auth";

export const ProtectedRoute = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthChange((currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return unsubscribe; // Cleanup on unmount
	}, []);

	if (loading) return <div>Loading...</div>;
	return user ? <Outlet /> : <Navigate to="/admin" replace />;
};
