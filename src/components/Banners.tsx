import { useGetBannersQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Banner } from "./Banner";

export function Banners() {
	const { data, error, loading } = useGetBannersQuery();

	if (loading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="md:w-1/2 mb-4 md:mb-0 border-t-8 border-r-8 border-f1-red rounded-tr-3xl">
			<div className="pr-2 pb-4 md:pb-0">
				{/* <Carousel> */}
				{data?.banners && data.banners.length > 0 ? (
					data.banners.map((data) => (
						<Banner
							key={data.id}
							title={data.title || ""}
							photo={data.photo || { url: GenericLogo }}
						/>
					))
				) : (
					<p>No banners available</p>
				)}
				{/* </Carousel> */}
			</div>
			<div className="md:hidden h-2 bg-divider bg-cover opacity-5"></div>
		</aside>
	);
}
