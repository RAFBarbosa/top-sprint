// src/config/tenants.ts
import { GridConfig } from "./grids";

export type TenantId = "topSprint" | "feliplay" | "brazuka";

export interface TenantConfig {
	id: TenantId;
	name: string;
	logo: {
		url: string;
		alt: string;
	};
	grids: readonly GridConfig[];
	features: {
		tickets: boolean;
		hallOfFame: boolean;
		partners: boolean;
		results: boolean;
	};
	nav: {
		ticketUrl?: string;
		registrationUrl?: string;
	};
}

export const TENANTS: Record<TenantId, TenantConfig> = {
	topSprint: {
		id: "topSprint",
		name: "Top Sprint",
		logo: {
			url: "/logos/topsprint.png",
			alt: "Logo Top Sprint",
		},
		grids: [
			{
				id: "gridA",
				label: "Top Sprint",
				primaryColor: "bg-f1-red",
				accentColor: "bg-f1-lightCarbon",
				hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
				hoverAccentColor: "hover:bg-f1-red hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_150%] from-f1-red to-f1-carbon to-65%",
				standingsTitle: "",
			},
			{
				id: "gridB",
				label: "Academy",
				primaryColor: "bg-f1-academy",
				accentColor: "bg-f1-academy-blue",
				hoverPrimaryColor: "hover:bg-f1-academy-blue hover:text-white",
				hoverAccentColor: "hover:bg-f1-academy-dark hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-f1-academy-blue to-f1-academy to-100%",
				standingsTitle: "Academy",
			},
		],
		features: {
			tickets: true,
			hallOfFame: true,
			partners: true,
			results: true,
		},
		nav: {
			ticketUrl:
				"https://marvelous-barracuda-f24.notion.site/2d9a6519acc080199dc7e431afd52d5a?pvs=105",
			registrationUrl:
				"https://docs.google.com/forms/d/19PHr-9GcvGMmp0SU2Nva9PEWDlm4R6JHjkIKD_L-YiI/edit",
		},
	},
	feliplay: {
		id: "feliplay",
		name: "Feliplay",
		logo: {
			url: "/logos/feliplay.png",
			alt: "Logo Feliplay",
		},
		grids: [
			{
				id: "gridA",
				label: "Feliplay Cup",
				primaryColor: "bg-f1-red",
				accentColor: "bg-f1-lighterCarbon",
				hoverPrimaryColor: "hover:bg-f1-lighterCarbon hover:text-white",
				hoverAccentColor: "hover:bg-f1-red hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-f1-silver to-f1-text to-70%",
				standingsTitle: "",
			},
		],
		features: {
			tickets: true,
			hallOfFame: true,
			partners: true,
			results: true,
		},
		nav: {
			ticketUrl:
				"https://docs.google.com/forms/d/e/1FAIpQLSfHN50Fhz16wKABFaKlBa-iLFSeDVENnuZyZ7pK40qXJkL5Nw/viewform",
		},
	},
	brazuka: {
		id: "brazuka",
		name: "Brazuka",
		logo: {
			url: "/src/assets/img/brazuka-logo.png",
			alt: "Logo Brazuka",
		},
		grids: [], // fill in later
		features: {
			tickets: false,
			hallOfFame: false,
			partners: false,
			results: false,
		},
	},
};

const tenantId = (import.meta.env.VITE_TENANT ?? "topSprint") as TenantId;

export const tenant = TENANTS[tenantId];
