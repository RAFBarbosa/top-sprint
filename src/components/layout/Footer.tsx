import { Logo } from "./Logo";
import { SocialIcon } from "react-social-icons";
import { Signature } from "../utils/Signature";
import { Partners } from "./Partners";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Socials } from "../utils/Socials";

export function Footer() {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	return (
		<footer className="bg-f1-carbon pb-6 text-white mt-auto">
			{!isAdminPage && <Partners />}
			<div className="flex flex-col-reverse md:flex-row justify-between md:max-w-screen-xl mx-auto px-3 pt-6">
				<div className="flex flex-col items-center md:items-start gap-2 md:gap-1 h-full">
					<div className="flex items-center gap-2 md:flex-col md:items-start">
						<div className="md:w-[70px] w-[40px] md:-translate-y-3">
							<Logo />
						</div>
						<div className="font-light text-sm md:-translate-y-6">
							Top Sprint League - Todos os direitos reservados
						</div>
					</div>
					<Link
						to="/admin/painel"
						className="z-50 text-white flex items-center gap-2 bg-f1-silver/80 hover:bg-f1-red/90 p-2 rounded cursor-pointer duration-120"
						title="Login Administrador"
					>
						<PersonIcon />
						Login
					</Link>
				</div>
				<div className="md:hidden h-[.5px] w-full bg-f1-silver my-6" />
				<div className="flex flex-col items-center gap-4 md:gap-2">
					<p className="flex justify-center text-center">
						Entre em contato e participe da próxima temporada
					</p>
					<Socials />
					<div className="h-[.5px] w-[45px] bg-f1-silver my-2 self-end hidden md:block" />

					<div className="self-end hidden md:block">
						<Signature />
					</div>
				</div>
				<div className="order-first w-full md:hidden">
					<div className="md:hidden h-[.5px] bg-f1-silver my-6" />
					<div className="self-end">
						<Signature side="left" />
					</div>
				</div>
			</div>
		</footer>
	);
}
