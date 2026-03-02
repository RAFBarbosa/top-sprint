import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/auth";

export const AdminLogin = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate("/admin/painel"); // Redirect on success
		} catch (err) {
			setError("Invalid email or password");
		}
	};

	return (
		<div className="flex-grow flex items-center justify-center p-4">
			<div className="max-w-md w-full p-6 bg-white border border-black/20 rounded-lg shadow">
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				{error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Senha"
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-f1-carbon text-white py-2 rounded hover:bg-transparent border border-f1-carbon hover:text-f1-carbon transition duration-120 cursor-pointer"
					>
						Entrar
					</button>
				</form>
			</div>
		</div>
	);
};
