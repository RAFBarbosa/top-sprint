import { SocialIcon } from "react-social-icons";
import { tenant } from "../config/tenants";

const { socials } = tenant;

export function Socials() {
	return (
		<div className="md:self-end space-x-2">
			{socials.whatsapp && (
				<SocialIcon
					network="whatsapp"
					target="_blank"
					url={socials.whatsapp}
					bgColor="transparent"
					className="social-icon-btn rounded-lg transition-colors duration-200 border-1 border-f1-silver"
					style={{ height: 45, width: 45 }}
				/>
			)}
			{socials.instagram && (
				<SocialIcon
					network="instagram"
					target="_blank"
					url={socials.instagram}
					bgColor="transparent"
					className="social-icon-btn rounded-lg transition-colors duration-200 border-1 border-f1-silver"
					style={{ height: 45, width: 45 }}
				/>
			)}
			{socials.youtube && (
				<SocialIcon
					network="youtube"
					target="_blank"
					url={socials.youtube}
					bgColor="transparent"
					className="social-icon-btn rounded-lg transition-colors duration-200 border-1 border-f1-silver"
					style={{ height: 45, width: 45 }}
				/>
			)}
			{socials.discord && (
				<SocialIcon
					network="discord"
					target="_blank"
					url={socials.discord}
					bgColor="transparent"
					className="social-icon-btn rounded-lg transition-colors duration-200 border-1 border-f1-silver"
					style={{ height: 45, width: 45 }}
				/>
			)}
			{socials.twitch && (
				<SocialIcon
					network="twitch"
					target="_blank"
					url={socials.twitch}
					bgColor="transparent"
					className="social-icon-btn rounded-lg transition-colors duration-200 border-1 border-f1-silver"
					style={{ height: 45, width: 45 }}
				/>
			)}
		</div>
	);
}
