import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../components/auth/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/adminClient";

export const OWNER_EMAIL = "rafatt3@gmail.com";

type Role = "owner" | "admin" | null;

interface UserRoleContextValue {
	role: Role;
	isOwner: boolean;
	loading: boolean;
}

const UserRoleContext = createContext<UserRoleContextValue>({
	role: null,
	isOwner: false,
	loading: true,
});

export function UserRoleProvider({ children }: { children: ReactNode }) {
	const [role, setRole] = useState<Role>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (!user?.email) {
				setRole(null);
				setLoading(false);
				return;
			}
			if (user.email.toLowerCase() === OWNER_EMAIL) {
				setRole("owner");
				setLoading(false);
				return;
			}
			try {
				const snap = await getDoc(
					doc(db, "user_roles", user.email.toLowerCase()),
				);
				setRole(
					snap.exists() && snap.data().role === "admin" ? "admin" : null,
				);
			} catch {
				setRole(null);
			}
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return (
		<UserRoleContext.Provider
			value={{ role, isOwner: role === "owner", loading }}
		>
			{children}
		</UserRoleContext.Provider>
	);
}

export const useUserRole = () => useContext(UserRoleContext);
