import { GridConfig } from "./grids";

export type TenantId = "topSprint" | "feliplay" | "brazuka";

export interface CssVars {
	"--color-brand-primary": string;
	"--color-brand-nav": string;
	"--color-brand-nav-hover": string;
	"--color-brand-accent": string;
	"--color-brand-nav-active": string;
	"--color-brand-nav-dropdown-bg": string;
	"--color-brand-footer": string;
}

export interface TenantConfig {
	id: TenantId;
	name: string;
	defaultPhotoStyle?: "portrait" | "round";
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
	cssVars: CssVars;
	socials: {
		whatsapp?: string;
		instagram?: string;
		youtube?: string;
		discord?: string;
		twitch?: string;
	};
	fallbackDriverPhoto: string;
	poweredBy?: boolean;
}

export const TENANTS: Record<TenantId, TenantConfig> = {
	topSprint: {
		id: "topSprint",
		name: "Top Sprint",
		defaultPhotoStyle: "portrait",
		logo: {
			url: "/logos/topsprint.png",
			alt: "Logo Top Sprint",
		},
		grids: [
			{
				id: "gridA",
				label: "Top Sprint",
				primaryColor: "#eb1c24",
				accentColor: "bg-f1-lightCarbon",
				hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
				hoverAccentColor: "hover:bg-f1-red hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_150%] from-f1-red to-f1-carbon to-65%",
				standingsTitle: "",
				countdownBgClass: "bg-f1-silver",
			},
			{
				id: "gridB",
				label: "Academy",
				primaryColor: "#11bf5b",
				accentColor: "bg-f1-academy-blue",
				hoverPrimaryColor: "hover:bg-f1-academy-blue hover:text-white",
				hoverAccentColor: "hover:bg-f1-academy-dark hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-f1-academy-blue to-f1-academy to-100%",
				standingsTitle: "Academy",
				countdownBgClass: "bg-f1-academy-darker",
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
		cssVars: {
			"--color-brand-primary": "#eb1c24",
			"--color-brand-nav": "#eb1c24",
			"--color-brand-nav-hover": "#15151e",
			"--color-brand-accent": "#15151e",
			"--color-brand-nav-active": "#15151e",
			"--color-brand-nav-dropdown-bg": "#15151e",
			"--color-brand-footer": "#15151e",
		},
		socials: {
			whatsapp: "https://chat.whatsapp.com/BBUq88qF23DFffFN7mlRz1",
			instagram: "https://www.instagram.com/ligatopsprint/",
			youtube: "https://www.youtube.com/@ligatopsprint",
			discord: "https://discord.gg/tZs5hwsubQ",
		},
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmkyoezu6gp7508loqaon7skm",
		poweredBy: false,
	},
	feliplay: {
		id: "feliplay",
		name: "Feliplay Cup",
		defaultPhotoStyle: "round",
		logo: {
			url: "/logos/feliplay.png",
			alt: "Logo Feliplay",
		},
		grids: [
			{
				id: "gridA",
				label: "Feliplay Cup",
				primaryColor: "#f50404",
				accentColor: "bg-f1-lightCarbon",
				hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
				hoverAccentColor: "hover:bg-f1-red hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-f1-silver to-f1-text to-70%",
				standingsTitle: "",
				countdownBgClass: "bg-f1-silver",
				photoStyle: "round",
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
		cssVars: {
			"--color-brand-primary": "#f50404",
			"--color-brand-nav": "#1c2423",
			"--color-brand-nav-hover": "#f50404",
			"--color-brand-accent": "#1c2423",
			"--color-brand-nav-active": "#f50404",
			"--color-brand-nav-dropdown-bg": "#000",
			"--color-brand-footer": "#1c2423",
		},
		socials: {
			youtube: "https://www.youtube.com/@feliplay_TV",
		},
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84",
		poweredBy: true,
	},
	brazuka: {
		id: "brazuka",
		name: "Brazuka",
		defaultPhotoStyle: "portrait",
		logo: {
			url: "/logos/brazuka.png",
			alt: "Logo Brazuka",
		},
		grids: [],
		features: {
			tickets: false,
			hallOfFame: false,
			partners: false,
			results: false,
		},
		nav: {},
		cssVars: {
			"--color-brand-primary": "#f50404",
			"--color-brand-nav": "#1c2423",
			"--color-brand-nav-hover": "#f50404",
			"--color-brand-accent": "#1c2423",
			"--color-brand-nav-active": "#f50404",
			"--color-brand-nav-dropdown-bg": "#000",
			"--color-brand-footer": "#1c2423",
		},
		socials: {},
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmkyoezu6gp7508loqaon7skm",
		poweredBy: true,
	},
};

const tenantId = (import.meta.env.VITE_TENANT ?? "topSprint") as TenantId;

export const tenant = TENANTS[tenantId];
