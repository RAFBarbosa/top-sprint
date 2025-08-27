import { Skeleton } from "@mui/material";

export function StandingsLoading() {
	return (
		<div className="text-white text-center mt-15">
			<div className="px-3 w-full md:max-w-screen-xl mx-auto">
				<div className="my-4">
					<div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
						<Skeleton
							animation="wave"
							variant="rounded"
							height={600}
							sx={{ width: "100%" }}
						/>
						<Skeleton
							animation="wave"
							variant="rounded"
							height={600}
							sx={{ width: "100%" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
