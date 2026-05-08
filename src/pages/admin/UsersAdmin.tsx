import { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { OWNER_EMAIL } from "../../contexts/UserRoleContext";
import { TrashIcon } from "@heroicons/react/24/outline";

interface AdminUser {
	email: string;
	role: "admin";
}

export function UsersAdmin() {
	const [admins, setAdmins] = useState<AdminUser[]>([]);
	const [newEmail, setNewEmail] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const fetchAdmins = async () => {
		setLoading(true);
		const snap = await getDocs(collection(db, "user_roles"));
		setAdmins(
			snap.docs
				.map((d) => d.data() as AdminUser)
				.filter((u) => u.role === "admin"),
		);
		setLoading(false);
	};

	useEffect(() => {
		fetchAdmins();
	}, []);

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = newEmail.trim().toLowerCase();
		if (!email || email === OWNER_EMAIL) return;
		setSaving(true);
		await setDoc(doc(db, "user_roles", email), { email, role: "admin" });
		setNewEmail("");
		await fetchAdmins();
		setSaving(false);
	};

	const handleRemove = async (email: string) => {
		await deleteDoc(doc(db, "user_roles", email));
		setAdmins((prev) => prev.filter((u) => u.email !== email));
	};

	return (
		<div className="max-w-xl">
			<h2 className="text-2xl font-bold mb-6">Gerenciar Usuários</h2>

			{loading ? (
				<p className="text-gray-500 text-sm">Carregando...</p>
			) : (
				<ul className="mb-4 space-y-2">
					<li className="flex items-center justify-between p-2 border rounded bg-gray-50">
						<span className="text-sm">{OWNER_EMAIL}</span>
					</li>
					{admins.map((u) => (
						<li
							key={u.email}
							className="flex items-center justify-between p-2 border rounded"
						>
							<span className="text-sm">{u.email}</span>
							<button
								onClick={() => handleRemove(u.email)}
								className="text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
								title="Remover"
							>
								<TrashIcon className="h-4 w-4" />
							</button>
						</li>
					))}
				</ul>
			)}

			<form onSubmit={handleAdd} className="flex gap-2 mt-4">
				<input
					type="email"
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
					placeholder="email@exemplo.com"
					className="flex-1 p-2 border rounded h-10 text-sm"
					required
				/>
				<button
					type="submit"
					disabled={saving}
					className="px-4 py-2 bg-f1-carbon text-white rounded hover:bg-transparent hover:text-f1-carbon border border-f1-carbon cursor-pointer duration-120 disabled:opacity-50 text-sm"
				>
					{saving ? "Adicionando..." : "Adicionar Admin"}
				</button>
			</form>
		</div>
	);
}
