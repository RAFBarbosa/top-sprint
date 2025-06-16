import { Skeleton } from "@mui/material";
import { useState } from "react";

interface Driver {
	id: string;
	name: string;
	photo?: { url: string };
	teamColor?: string;
	// number: string;
}

interface TeamProps {
	name: string;
	logo: string;
	teamColor?: string;
	gridA: Driver[];
	gridB: Driver[];
}

export function Team({ name, logo, teamColor, gridA, gridB }: TeamProps) {
	const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
		{}
	);

	const handleImageLoad = (id: string) => {
		setLoadingImages((prev) => ({ ...prev, [id]: false }));
	};

	return (
		<div
			className="p-4 rounded-lg shadow-md flex justify-center items-center min-h-110 border-b-20"
			style={{ borderColor: teamColor }}
		>
			<div className="flex flex-col md:flex-row gap-5 md:gap-15">
				<div className="order-2 md:order-1">
					<h3 className="font-bold uppercase text-xl md:text-2xl mb-2 md:mb-4 text-center">
						Grid A
					</h3>
					<div className="flex flex-wrap gap-4 justify-center">
						{gridA.map((driver) => (
							<div
								key={driver.id}
								className="relative w-[220px] md:w-[260px]"
							>
								{(loadingImages[driver.id] ?? true) && (
									<Skeleton
										variant="rounded"
										width={260}
										height={260}
									/>
								)}
								<div className="relative">
									<img
										src={
											driver.photo?.url ||
											"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84"
										}
										alt={driver.name}
										className={`w-[220px] h-[220px] md:w-[260px] md:h-[260px] object-cover transition-opacity duration-300 ${
											loadingImages[driver.id] === false
												? "opacity-100"
												: "opacity-0"
										}`}
										onLoad={() =>
											handleImageLoad(driver.id)
										}
									/>
									<div
										className="absolute bottom-0 left-0 right-0 h-[60px]"
										style={{
											background:
												"linear-gradient(to top, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
										}}
									/>
								</div>
								<p className="text-center -mt-5 text-lg md:text-xl uppercase font-semibold leading-5 relative z-10">
									{driver.name}
								</p>
								<p className="text-center mt-1 text-lg md:text-xl uppercase italic leading-5 relative z-10">
									{driver.number}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="order-1 md:order-2 flex flex-col items-center justify-center gap-2 md:mb-0 mb-2">
					<h2 className="font-f1Title text-base md:text-xl uppercase -mb-2 mt-2 md:mt-0">
						{name}
					</h2>
					<img
						className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] object-cover"
						src={logo}
						alt={name}
					/>
				</div>

				<div className="order-3">
					<h3 className="font-bold uppercase text-xl md:text-2xl mb-2 md:mb-4 text-center">
						Grid B
					</h3>
					<div className="flex flex-wrap gap-4 justify-center">
						{gridB.map((driver) => (
							<div
								key={driver.id}
								className="relative w-[220px] md:w-[260px]"
							>
								{(loadingImages[driver.id] ?? true) && (
									<Skeleton
										variant="rounded"
										width={260}
										height={260}
									/>
								)}
								<div className="relative">
									<img
										src={
											driver.photo?.url ||
											"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84"
										}
										alt={driver.name}
										className={`w-[220px] h-[220px] md:w-[260px] md:h-[260px] object-cover transition-opacity duration-300 ${
											loadingImages[driver.id] === false
												? "opacity-100"
												: "opacity-0"
										}`}
										onLoad={() =>
											handleImageLoad(driver.id)
										}
									/>
									<div
										className="absolute bottom-0 left-0 right-0 h-[60px]"
										style={{
											background:
												"linear-gradient(to top, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
										}}
									/>
								</div>
								<p className="text-center -mt-5 text-lg md:text-xl uppercase font-semibold leading-5 relative z-10">
									{driver.name}
								</p>
								<p className="text-center mt-1 text-lg md:text-xl uppercase italic leading-5 relative z-10">
									{driver.number}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
