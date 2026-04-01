import { SecondaryBanner } from "./SecondaryBanner";
import GenericLogo from "/src/assets/img/white-logo.png";

interface BannerData {
	id: string;
	link?: string;
	resolvedLink?: string;
	category?: string;
	title?: string;
	content?: string;
	photo?: { url: string };
}

interface SecondaryBannersProps {
	banners: BannerData[];
}

export function SecondaryBanners({ banners }: SecondaryBannersProps) {
	if (!banners || banners.length === 0) {
		return (
			<div className="h-full flex flex-col justify-center items-center text-gray-500">
				<p>Nenhum banner secundário encontrado</p>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col justify-between">
			{banners.map((banner) => (
				<SecondaryBanner
					key={banner.id}
					link={banner.resolvedLink ?? banner.link ?? ""}
					category={banner.category || ""}
					title={banner.title || ""}
					content={banner.content || ""}
					photo={banner.photo || { url: GenericLogo }}
				/>
			))}
		</div>
	);
}
