import { Logo } from "./Logo";
import { SocialIcon } from "react-social-icons";
import { Signature } from "../utils/Signature";

export function Footer() {
	return (
		<footer className="bg-f1-carbon py-6 text-white mt-auto">
			<div className="flex flex-col-reverse md:flex-row justify-between items-center md:max-w-screen-xl mx-auto px-3">
				<div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
					<div className="md:w-[60px] w-[40px]">
						<Logo />
					</div>
					<p className="font-light text-sm md:-translate-y-2">
						Top Sprint League - Todos os direitos reservados
					</p>
				</div>
				<div className="md:hidden h-[.5px] w-full bg-f1-silver my-6" />
				<div className="flex flex-col items-center gap-4 md:gap-2">
					<p className="flex justify-center text-center">
						Entre em contato e participe da próxima temporada
					</p>
					<div className="md:self-end space-x-2">
						<SocialIcon
							className="bg-f1-carbon rounded-lg hover:bg-f1-silver transition-colors duration-200 border-1 border-f1-silver"
							network="whatsapp"
							target="_blank"
							url="https://chat.whatsapp.com/BBUq88qF23DFffFN7mlRz1"
							bgColor="transparent"
							style={{ height: 45, width: 45 }}
						/>
						<SocialIcon
							className="bg-f1-carbon rounded-lg hover:bg-f1-silver transition-colors duration-200 border-1 border-f1-silver"
							network="instagram"
							target="_blank"
							url="https://www.instagram.com/ligatopsprint/"
							bgColor="transparent"
							style={{ height: 45, width: 45 }}
						/>
						<SocialIcon
							className="bg-f1-carbon rounded-lg hover:bg-f1-silver transition-colors duration-200 border-1 border-f1-silver"
							network="youtube"
							target="_blank"
							url="https://www.youtube.com/@ligatopsprint"
							bgColor="transparent"
							style={{ height: 45, width: 45 }}
						/>
						<SocialIcon
							className="bg-f1-carbon rounded-lg hover:bg-f1-silver transition-colors duration-200 border-1 border-f1-silver"
							network="discord"
							target="_blank"
							url="https://discord.gg/tZs5hwsubQ"
							bgColor="transparent"
							style={{ height: 45, width: 45 }}
						/>
					</div>
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
