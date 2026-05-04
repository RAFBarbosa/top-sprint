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
		gtagId: string;
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
		themeColor: "#eb1c24",
		url: "https://www.ligatopsprint.com",
		gtagId: "G-N82GC0X63T",
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
		gtagId: "G-P3CV4WHXE7",
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
		gtagId: "G-N82GC0X63T",
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
