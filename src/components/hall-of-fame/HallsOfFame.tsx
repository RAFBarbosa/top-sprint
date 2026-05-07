import { useState } from "react";
import { Skeleton } from "@mui/material";
import Carousel from "../utils/Carousel";
import { HallOfFame } from "./HallOfFame";
import {
	useGetHallsOfFameFullQuery,
	useGetHallsOfFameQuery,
} from "../../graphql/generated";
import { Divider } from "../layout/Divider";
import { tenant } from "../../shared/config/tenants";

type Season = {
	id: string;
	season: string;
	photo: { id: string; url: string }[];
};

const loadingSkeleton = () => {
	return (
		<div className="px-3 w-full md:max-w-screen-xl mx-auto">
			<div className="my-4">
				<Skeleton
					animation="wave"
					variant="rounded"
					height={350}
					sx={{ width: "100%" }}
				/>
			</div>
		</div>
	);
};

function SeasonSwitcher({ seasons }: { seasons: Season[] }) {
	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(true);
	const season = seasons[index];
	const hasNav = seasons.length > 1;

	const goTo = (next: number) => {
		setVisible(false);
		setTimeout(() => {
			setIndex(next);
			setVisible(true);
		}, 200);
	};

	return (
		<div>
			<div className="flex flex-col min-[950px]:flex-row min-[950px]:items-center min-[950px]:justify-between mb-4 gap-3">
				<h2 className="font-semibold text-2xl md:text-3xl tracking-wide">
					{season.season}
				</h2>
				{hasNav && (
					<div className="flex items-center justify-center min-[950px]:justify-start gap-2">
						<button
							onClick={() => goTo(index - 1)}
							disabled={index === 0}
							className="swiper-button-prev swiper-btn-inline"
						/>
						<button
							onClick={() => goTo(index + 1)}
							disabled={index === seasons.length - 1}
							className="swiper-button-next swiper-btn-inline"
						/>
					</div>
				)}
			</div>
			<div
				className="w-full h-3 mb-4"
				style={{ backgroundColor: "var(--color-brand-primary)" }}
			/>
			<div
				className="transition-opacity duration-200 min-h-[350px]"
				style={{ opacity: visible ? 1 : 0 }}
			>
				<Carousel>
					{season.photo.map((photo, idx) => (
						<HallOfFame
							key={`${season.id}-${idx}`}
							season={season.season}
							photo={photo}
						/>
					))}
				</Carousel>
			</div>
		</div>
	);
}

export function HallsOfFame() {
	const isTopSprint = tenant.id === "topSprint";
	const full = useGetHallsOfFameFullQuery({ skip: !isTopSprint });
	const basic = useGetHallsOfFameQuery({ skip: isTopSprint });
	const { data, error, loading } = isTopSprint ? full : basic;
	const [legacyOpen, setLegacyOpen] = useState(false);

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	const current = (data?.hallsOfFame ?? []).filter(
		(h) => !("legacy" in h) || !h.legacy,
	);
	const legacy = (data?.hallsOfFame ?? []).filter(
		(h) => "legacy" in h && h.legacy,
	);

	return (
		<aside className="tenant-section tenant-section-champions pt-8">
			<div className="w-full max-w-screen-xl mx-auto px-3">
				<div className="mb-8">
					<h1 className="tenant-section-title font-extrabold text-4xl md:text-6xl tracking-wide mb-6">
						Mural dos Campeões
					</h1>
					<Divider className="max-w-screen-xl mx-auto" />

					{current.length > 0 ? (
						<SeasonSwitcher seasons={current} />
					) : (
						<p>No champions available</p>
					)}

					{legacy.length > 0 && (
						<div className="mt-4 mb-12">
							<Divider />
							<button
								onClick={() => setLegacyOpen((o) => !o)}
								className="flex items-center justify-between w-full text-left group cursor-pointer"
							>
								<h2 className="font-semibold text-2xl md:text-3xl tracking-wide">
									Legado Top Sprint
								</h2>
								<span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">
									{legacyOpen ? "▲" : "▼"}
								</span>
							</button>

							{legacyOpen && (
								<div className="mt-6">
									<div className="bg-white/10 rounded-xl px-4 py-3 mb-6 text-sm leading-relaxed">
										Em 2026, a CRT passou a gerir o
										campeonato, elevando o nível da
										competição e dando início a uma nova
										fase. Os títulos abaixo pertencem à
										história original da Top Sprint,
										conquistas que ajudaram a construir a
										comunidade que temos hoje, preservadas
										aqui com muito orgulho.
									</div>
									<SeasonSwitcher seasons={legacy} />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className="w-full bg-f1-silver text-white py-8">
				<div className="max-w-screen-xl mx-auto px-3">
					<div
						style={{ borderColor: "var(--color-brand-primary)" }}
						className="border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6"
					>
						<h2 className="font-bold text-3xl md:text-4xl">
							Prêmios
						</h2>
					</div>
					<div className="pr-3">
						<ul className="list-disc ml-5 mb-2">
							<li>
								A premiação varia a cada temporada e pode
								incluir troféus, medalhas, premiações em
								dinheiro e outros reconhecimentos
								especiais.{" "}
							</li>
							<li>
								A cada edição buscamos elevar o nível e
								valorizar ainda mais os campeões.
							</li>
							<li>
								Os detalhes completos são divulgados antes do
								início de cada temporada.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
}
