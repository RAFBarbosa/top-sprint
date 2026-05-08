import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserRole } from "../../contexts/UserRoleContext";

export function OwnerOnly({ children }: { children: ReactNode }) {
	const { isOwner, loading } = useUserRole();
	if (loading) return null;
	if (!isOwner) return <Navigate to="/admin/painel/pilotos" replace />;
	return <>{children}</>;
}
