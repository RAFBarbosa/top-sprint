import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import Carousel from "../utils/Carousel";
import { HallOfFame } from "./HallOfFame";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { Divider } from "../layout/Divider";
import { useTenantConfig } from "../../contexts/TenantConfigContext";

type Season = {
	id: string;
	season: string;
	photo: { id: string; url: string }[];
	legacy?: boolean;
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
							aria-label="Anterior"
							className="swiper-button-prev swiper-btn-inline"
						>
							<svg className="swiper-navigation-icon" style={{ transform: "rotate(180deg)" }} width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>
						</button>
						<button
							onClick={() => goTo(index + 1)}
							disabled={index === seasons.length - 1}
							aria-label="Próximo"
							className="swiper-button-next swiper-btn-inline"
						>
							<svg className="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>
						</button>
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
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [legacyOpen, setLegacyOpen] = useState(false);
	const { hallOfFameLegacy } = useTenantConfig();

	useEffect(() => {
		getDocs(query(collection(db, "hallsOfFame"), where("deleted", "==", false)))
			.then((snap) => {
				const items: Season[] = snap.docs
					.map((d) => {
						const data = d.data();
						return {
							id: d.id,
							season: data.season as string,
							legacy: data.legacy ?? false,
							active: data.active ?? true,
							photo: ((data.photoUrls ?? []) as string[]).map(
								(url) => ({ id: url, url }),
							),
						};
					})
					.filter((item) => (item as any).active !== false)
					.sort((a, b) => b.season.localeCompare(a.season));
				setSeasons(items);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error}</div>;

	const current = seasons.filter((h) => !h.legacy);
	const legacy = seasons.filter((h) => h.legacy);

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

					{hallOfFameLegacy.enabled && legacy.length > 0 && (
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
									{hallOfFameLegacy.text && (
										<div className="tenant-champions-legacy-text bg-white/10 rounded-xl px-4 py-3 mb-6 text-sm leading-relaxed">
											{hallOfFameLegacy.text}
										</div>
									)}
									<SeasonSwitcher seasons={legacy} />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className="tenant-champions-awards w-full bg-f1-silver py-8">
				<div className="max-w-screen-xl mx-auto px-3">
					<div
						style={{ borderColor: "var(--color-brand-primary)" }}
						className="border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6"
					>
						<h2 className="font-bold text-3xl md:text-4xl">Prêmios</h2>
					</div>
					<div className="pr-3">
						<ul className="list-disc ml-5 mb-2">
							<li>
								A premiação varia a cada temporada e pode incluir
								troféus, medalhas, premiações em dinheiro e outros
								reconhecimentos especiais.
							</li>
							<li>
								A cada edição buscamos elevar o nível e valorizar
								ainda mais os campeões.
							</li>
							<li>
								Os detalhes completos são divulgados antes do início
								de cada temporada.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
}
