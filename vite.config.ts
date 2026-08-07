import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// ── Tenant metadata for HTML injection ───────────────────────────────────────

const tenantMeta: Record<
	string,
	{
		name: string;
		title: string;
		ogTitle: string;
		description: string;
		keywords: string;
		themeColor: string;
		url: string;
		logoUrl: string;
		gtagId: string;
		hasExtendedFavicons: boolean;
	}
> = {
	topSprint: {
		name: "CRT Cup",
		title: "CRT Cup",
		ogTitle: "CRT Cup - Fórmula 1 Virtual",
		description:
			"CRT Cup: Competição de Fórmula 1 virtual, simulando corridas intensas com pilotos de todo o Brasil.",
		keywords:
			"Fórmula 1 virtual, automobilismo virtual, simulação de corridas, CRT Cup, F1 eSports, campeonatos de simulação, ligas de corrida online, corridas virtuais, F1 simulador",
		themeColor: "#cd0a2a",
		url: "https://www.crtcup.com",
		logoUrl:
			"https://us-west-2.graphassets.com/cmo66v1n000gr02js1cyb6pmx/cmpgqi3md1brl07n2ps55tbx1",
		gtagId: "G-N82GC0X63T",
		hasExtendedFavicons: true,
	},
	feliplay: {
		name: "Feliplay Cup",
		title: "Feliplay Cup",
		ogTitle: "Feliplay Cup - Fórmula 1 Virtual",
		description:
			"Feliplay Cup: Competição de Fórmula 1 virtual, simulando corridas intensas com pilotos de todo o Brasil.",
		keywords:
			"Fórmula 1 virtual, automobilismo virtual, simulação de corridas, Feliplay Cup, F1 eSports, campeonatos de simulação, ligas de corrida online, corridas virtuais, F1 simulador",
		themeColor: "#f50404",
		url: "https://www.feliplay.com.br",
		logoUrl: "https://www.feliplay.com.br/logos/feliplay.png",
		gtagId: "G-P3CV4WHXE7",
		hasExtendedFavicons: false,
	},
	brazuka: {
		name: "F1 Brazuka",
		title: "F1 Brazuka",
		ogTitle: "F1 Brazuka - Fórmula 1 Virtual",
		description:
			"F1 Brazuka: Competição de Fórmula 1 virtual, simulando corridas intensas com pilotos de todo o Brasil.",
		keywords:
			"Fórmula 1 virtual, automobilismo virtual, simulação de corridas, F1 Brazuka, F1 eSports, corridas virtuais",
		themeColor: "#064c24",
		url: "https://www.f1brazuka.com.br",
		logoUrl: "https://www.f1brazuka.com.br/logos/brazuka.png",
		gtagId: "G-N82GC0X63T",
		hasExtendedFavicons: false,
	},
	brasilF1: {
		name: "Brasil F1 E-Sports Series",
		title: "Brasil F1 E-Sports Series",
		ogTitle: "Brasil F1 E-Sports Series - Fórmula 1 Virtual",
		description:
			"Brasil F1 E-Sports Series: Competição de Fórmula 1 virtual, simulando corridas intensas com pilotos de todo o Brasil.",
		keywords:
			"Fórmula 1 virtual, automobilismo virtual, simulação de corridas, Brasil F1 E-Sports Series, F1 eSports, corridas virtuais",
		themeColor: "#064c24",
		url: "https://brasil-f1.vercel.app/",
		logoUrl: "https://brasil-f1.vercel.app/logos/brasil-f1.png",
		gtagId: "G-356KPCQPSJ",
		hasExtendedFavicons: false,
	},
};

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const tenantId = env.VITE_TENANT ?? "topSprint";
	const meta = tenantMeta[tenantId] ?? tenantMeta.topSprint;

	const publicDirs: Record<string, string> = {
		topSprint: "public-topSprint",
		feliplay: "public-feliplay",
		brazuka: "public-brazuka",
	};

	return {
		publicDir: publicDirs[tenantId] ?? "public",
		server: {
			host: "0.0.0.0",
			port: 5173,
		},
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: meta,
				},
			}),
		],
	};
});
