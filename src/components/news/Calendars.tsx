import { useGetCalendarsQuery } from "../../graphql/generated";
import GenericLogo from "/src/assets/img/white-logo.png";
import { Calendar } from "./Calendar";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";
import { TabSwitch } from "../standings/csv/TabSwitch";

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
	const { activeTab } = useTab();

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	const filteredCalendars = data?.calendars.filter((calendar) => {
		return calendar.grid === activeTab.id;
	});

	return (
		<aside className="md:w-1/2">
			<div className="mx-auto flex flex-col gap-6">
				<div
					className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-4 md:border-b-10 md:mb-6 ${
						activeTab.id === "gridA"
							? "border-f1-lighterPurple"
							: "border-f1-carbon"
					}`}
				>
					<h2
						className={`w-full font-bold text-4xl border-b-10 pb-2 md:border-0 md:pb-0 ${
							activeTab.id === "gridA"
								? "border-f1-lighterPurple"
								: "border-f1-carbon"
						}`}
					>
						Calendário
					</h2>
					<div className="w-full md:w-auto flex justify-end">
						<TabSwitch />
					</div>
				</div>

				<div className="flex flex-wrap gap-4 w-full justify-between">
					{filteredCalendars && filteredCalendars.length > 0 ? (
						filteredCalendars.map((data) => (
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
