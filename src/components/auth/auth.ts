import { auth } from "./firebase";
import {
	signInWithEmailAndPassword,
	UserCredential,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";

// Login with email/password
export const login = async (
	email: string,
	password: string
): Promise<UserCredential> => {
	return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async (): Promise<void> => {
	await signOut(auth);
};

// Listen for auth state changes (e.g., user logs in/out)
export const onAuthChange = (callback: (user: User | null) => void) => {
	return onAuthStateChanged(auth, callback);
};
