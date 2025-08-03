// src/components/LoginIcon.tsx
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

export function LoginIcon() {
	return (
		<Link
			to="/admin"
			className="z-50 text-white"
			title="Login Administrador"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<PersonIcon />
			</svg>
		</Link>
	);
}
