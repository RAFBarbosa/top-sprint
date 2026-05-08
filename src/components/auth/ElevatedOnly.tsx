import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserRole } from "../../contexts/UserRoleContext";

export function ElevatedOnly({ children }: { children: ReactNode }) {
	const { role, loading } = useUserRole();
	if (loading) return null;
	if (role !== "owner" && role !== "admin")
		return <Navigate to="/admin/painel/pilotos" replace />;
	return <>{children}</>;
}
