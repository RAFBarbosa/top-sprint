import { useGetNextRaceQuery } from "../graphql/generated";
import GenericLogo from "/src/assets/logosemfundo.png";
import { NextRace } from "./NextRace";

export function NextRaces() {
	const { data, error, loading } = useGetNextRaceQuery();

	if (loading)
		return (
			<div className="text-f1-silver text-center py-6">Carregando...</div>
		);
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	return (
		<div className="text-white">
			{data?.races && data.races.length > 0 ? (
				data.races.map((data) => (
					<NextRace
						key={data.id}
						track={data.track || ""}
						date={data.date || ""}
						flag={data.flag || { url: GenericLogo }}
					/>
				))
			) : (
				<p className="text-white text-center">No drivers available</p>
			)}
		</div>
	);
}
