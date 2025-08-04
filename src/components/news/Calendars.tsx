import { useGetCalendarsQuery } from "../../graphql/generated";
import GenericLogo from "/src/assets/img/white-logo.png";
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
		<aside className="md:w-1/2">
			<div className="mx-auto flex flex-col gap-6">
				<span className="font-bold text-4xl border-b-10 pb-2">
					Calendário
				</span>

				<div className="flex flex-wrap gap-4 w-full justify-between">
					{data?.calendars && data.calendars.length > 0 ? (
						data.calendars.map((data) => (
							<Calendar
								key={data.id}
								round={data.round || ""}
								track={data.track || ""}
								description={data.description || ""}
								date={data.date || ""}
								link={data.link || ""}
								flag={data.flag || { url: GenericLogo }}
							/>
						))
					) : (
						<p>No calendar available</p>
					)}
				</div>
			</div>
		</aside>
	);
}
