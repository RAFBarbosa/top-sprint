import { useGetCalendarsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Calendar } from "./Calendar";
import { Skeleton } from "@mui/material";

const loadingSkeleton = () => {
	return (
		<div className="w-[305px] my-6 md:mb-0 mx-auto">
			<Skeleton
				animation="wave"
				variant="rectangular"
				height={500}
				sx={{ my: 1, margin: "auto" }}
			/>
		</div>
	);
};

export function Calendars() {
	const { data, error, loading } = useGetCalendarsQuery();

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="md:w-1/2 flex flex-col">
			{/* <span className="">Calendario</span> */}

			{/* <Carousel> */}
			<div className="mx-auto">
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
			</div>
		</aside>
	);
}
