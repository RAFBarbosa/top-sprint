import { SocialIcon } from "react-social-icons";

export function Socials() {
	return (
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
	);
}
