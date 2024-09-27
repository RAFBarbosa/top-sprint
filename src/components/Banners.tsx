import { useGetBannersQuery } from "../graphql/generated";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Banner } from "./Banner";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

// const wrapped1 = <Skeleton wrapper={Banners} count={5} />;

export function Banners() {
	const { data, error, loading } = useGetBannersQuery();

	// if (loading) return <div>Carregando banners</div>;
	if (error) return <div>Erro: {error.message}</div>;

	// const [loadingSkeleton, setLoading] = useState(true);

	// useEffect(() => {
	// 	setTimeout(() => setLoading(false), 1000);
	// }, []);

	return (
		<aside className="md:w-1/2 mb-4 md:mb-0 border-t-8 border-r-8 border-f1-red rounded-tr-3xl">
			<div className="pr-2 pb-4 md:pb-0">
				{/* {data?.banners && data.banners.length > 0 ? (
					data.banners.map((data) => (
						<Banner
							key={data.id}
							link={data.link || ""}
							title={data.title || ""}
							photo={data.photo || { url: GenericLogo }}
						/>
					))
				) : (
					<Skeleton />
				)} */}
				{data?.banners.map((data) => (
					<Banner
						key={data.id}
						link={data.link || ""}
						title={data.title || ""}
						photo={data.photo || { url: GenericLogo }}
					/>
				))}
			</div>
			<div className="md:hidden h-2 bg-divider bg-cover opacity-10 mr-2"></div>
		</aside>
	);
}
