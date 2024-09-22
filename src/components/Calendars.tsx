import { useGetCalendarsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Calendar } from "./Calendar";

export function Calendars() {
	const { data, error, loading } = useGetCalendarsQuery();

	if (loading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="md:w-1/2">
			<span className="">Calendario</span>

			{/* <Carousel> */}
			{data?.calendars && data.calendars.length > 0 ? (
				data.calendars.map((data) => (
					<Calendar
						key={data.id}
						season={data.season || ""}
						photo={data.photo || { url: GenericLogo }}
					/>
				))
			) : (
				<p>No calendar available</p>
			)}
			{/* </Carousel> */}
		</aside>
	);
}
