import { useGetPartnersQuery } from "../../graphql/generated";

export function Partners() {
	const { data } = useGetPartnersQuery();
	const partners = data?.partners || [];

	if (partners.length === 0) return null;

	return (
		<div className="bg-f1-lightCarbon w-full py-6">
			<div className="md:max-w-screen-xl mx-auto px-3">
				<h3 className="text-f1-white font-extrabold text-center text-3xl mb-6 tracking-wide">
					Nossos Parceiros
				</h3>
				<div className="flex flex-wrap justify-center gap-10">
					{partners.map((partner) => (
						<a
							key={partner.id}
							href={partner.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center w-38 p-2 hover:bg-f1-silver rounded-2xl"
						>
							<img
								src={
									partner.footerLogo?.url ||
									partner.image?.url
								}
								alt={partner.altText || partner.name}
								className="max-h-full max-w-full object-contain rounded-lg p-1"
							/>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
