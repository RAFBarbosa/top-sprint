import topSprintA from "/src/assets/img/card-backgrounds/topsprint-a.jpg";
import topSprintChuva from "/src/assets/img/card-backgrounds/topsprint-chuva.jpg";
import topSprintB from "/src/assets/img/card-backgrounds/topsprint-b.jpg";
import feliplay from "/src/assets/img/card-backgrounds/feliplay.jpg";
import brazukaF1 from "/src/assets/img/card-backgrounds/brazuka-f1.png";
import brazukaF2 from "/src/assets/img/card-backgrounds/brazuka-f2.png";

export type TenantId = "topSprint" | "feliplay" | "brazuka";

export interface CssVars {
	"--color-brand-primary": string;
	"--color-brand-nav": string;
	"--color-brand-nav-hover": string;
	"--color-brand-accent": string;
	"--color-brand-nav-active": string;
	"--color-brand-nav-dropdown-bg": string;
	"--color-brand-footer": string;
	"--color-grid-menu-bg": string;
	"--color-grid-menu-text": string;
	"--color-grid-menu-border": string;
	"--color-countdown-bg": string;
	"--color-news-bg": string;
	"--color-calendars-bg": string;
	"--color-standings-bg": string;
	"--color-teams-bg": string;
	"--font-f1"?: string;
	"--font-f1Title"?: string;
	"--font-f1Podium"?: string;
}

export interface TenantConfig {
	id: TenantId;
	name: string;
	defaultPhotoStyle?: "portrait" | "round" | "bust";
	logo: {
		url: string;
		alt: string;
	};
	grids: readonly any[];
	features: {
		tickets: boolean;
		hallOfFame: boolean;
		partners: boolean;
		archive: boolean;
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
			url: "/logos/crt.png",
			alt: "Logo CRT",
		},
		grids: [
			{
				id: "gridA",
				label: "C1",
				primaryColor: "#cd0a2a",
				accentColor: "bg-crt-secondary",
				hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
				hoverAccentColor: "hover:bg-crt-primary hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_150%] from-crt-primary to-crt-dark-bg to-65%",
				standingsTitle: "",
				countdownBgClass: "bg-f1-silver",
				cardBackground: topSprintA,
				pointSystem: {
					race: [
						25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
				],
			},
			{
				id: "gridB",
				label: "C2",
				primaryColor: "#11bf5b",
				accentColor: "bg-f1-academy-blue",
				hoverPrimaryColor: "hover:bg-f1-academy-blue hover:text-white",
				hoverAccentColor: "hover:bg-f1-academy-dark hover:text-white",
				// standingsBgClass:
				// 	"bg-radial-[at_50%_100%] from-f1-academy-blue to-f1-academy to-100%",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-crt-blue to-crt-dark-bg to-65%",
				standingsTitle: "",
				countdownBgClass: "bg-f1-academy-darker",
				cardBackground: topSprintB,
				pointSystem: {
					race: [
						25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
				],
			},
		],
		features: {
			tickets: true,
			hallOfFame: true,
			partners: true,
			archive: false,
		},
		nav: {
			ticketUrl:
				"https://marvelous-barracuda-f24.notion.site/2d9a6519acc080199dc7e431afd52d5a?pvs=105",
			// registrationUrl:
			// 	"https://docs.google.com/forms/d/19PHr-9GcvGMmp0SU2Nva9PEWDlm4R6JHjkIKD_L-YiI/edit",
		},
		cssVars: {
			"--color-brand-primary": "#cd0a2a",
			"--color-brand-nav": "#676769",
			"--color-brand-nav-hover": "#cd0a2a",
			"--color-brand-accent": "#15151e",
			"--color-brand-nav-active": "#cd0a2a",
			"--color-brand-nav-dropdown-bg": "#15151e",
			"--color-brand-footer": "#15151e",
			"--color-grid-menu-bg": "#0c0c0c",
			"--color-grid-menu-text": "#eeeff1",
			"--color-grid-menu-border": "#cd0a2a",
			"--color-countdown-bg": "#0c0c0c",
			"--color-news-bg": "#111214",
			"--color-calendars-bg": "#27292c",
			"--color-standings-bg": "#111214",
			"--color-teams-bg": "#27292c",
			"--font-f1": "'FutoSans', sans-serif",
			"--font-f1Title": "'Vipnagorgialla', sans-serif",
			"--font-f1Podium": "'Chakra Petch', sans-serif",
		},
		socials: {
			// whatsapp: "https://chat.whatsapp.com/BBUq88qF23DFffFN7mlRz1",
			instagram: "https://www.instagram.com/crt.cup",
			youtube: "https://www.youtube.com/@capivaracup",
			// discord: "https://discord.gg/tZs5hwsubQ",
		},
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/cmo66v1n000gr02js1cyb6pmx/cmo6d8bg6embs07lpjska6fo7",
		poweredBy: true,
	},
	feliplay: {
		id: "feliplay",
		name: "Feliplay Cup",
		defaultPhotoStyle: "round",
		logo: { url: "/logos/feliplay.png", alt: "Logo Feliplay" },
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
				cardBackground: feliplay,
				pointSystem: {
					race: [
						25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
				],
			},
		],
		features: {
			tickets: true,
			hallOfFame: true,
			partners: true,
			archive: false,
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
			"--color-grid-menu-bg": "#f50404",
			"--color-grid-menu-text": "#ffffff",
			"--color-grid-menu-border": "transparent",
			"--color-countdown-bg": "#0c0c0c",
			"--color-news-bg": "transparent",
			"--color-calendars-bg": "transparent",
			"--color-standings-bg": "transparent",
			"--color-teams-bg": "transparent",
		},
		socials: { youtube: "https://www.youtube.com/@feliplay_TV" },
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84",
		poweredBy: true,
	},
	brazuka: {
		id: "brazuka",
		name: "Brazuka",
		defaultPhotoStyle: "bust",
		logo: { url: "/logos/brazuka.png", alt: "Logo Brazuka" },
		grids: [
			{
				id: "gridA",
				label: "Alpha",
				primaryColor: "#38383f",
				accentColor: "bg-f1-carbon",
				hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
				hoverAccentColor: "hover:bg-f1-lightCarbon hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_150%] from-f1-red to-f1-carbon to-65%",
				standingsTitle: "Alpha",
				countdownBgClass: "bg-f1-silver",
				cardBackground: brazukaF1,
				pointSystem: {
					race: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
					{ id: "driverOfTheDay", label: "Piloto do Dia", points: 0 },
					{ id: "fairplay", label: "Fairplay", points: 0 },
					{
						id: "mostOvertakes",
						label: "Mais Ultrapassagens",
						points: 0,
					},
				],
			},
			{
				id: "gridB",
				label: "Bravo",
				primaryColor: "#eb1c24",
				accentColor: "bg-f1-lightCarbon",
				hoverPrimaryColor: "hover:bg-f1-darkerRed hover:text-white",
				hoverAccentColor: "hover:bg-f1-red hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_150%] from-f1-darkerRed to-f1-lightSilver to-225%",
				standingsTitle: "Bravo",
				countdownBgClass: "bg-f1-darkerRed",
				cardBackground: brazukaF1,
				pointSystem: {
					race: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
					{ id: "driverOfTheDay", label: "Piloto do Dia", points: 0 },
					{ id: "fairplay", label: "Fairplay", points: 0 },
					{
						id: "mostOvertakes",
						label: "Mais Ultrapassagens",
						points: 0,
					},
				],
			},
			{
				id: "gridC",
				label: "Charlie",
				primaryColor: "#00335e",
				accentColor: "bg-f1-academy-blue",
				hoverPrimaryColor: "hover:bg-f1-academy-blue hover:text-white",
				hoverAccentColor: "hover:bg-f1-academy-dark hover:text-white",
				standingsBgClass:
					"bg-radial-[at_50%_100%] from-f1-academy-blue to-f1-darkerBlue to-150%",
				standingsTitle: "Charlie",
				countdownBgClass: "bg-f1-academy-darkerBlue",
				cardBackground: brazukaF2,
				pointSystem: {
					race: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					sprint: [
						25, 20, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
						5, 4, 3, 2, 1,
					],
					poleBonus: 1,
				},
				raceAwards: [
					{ id: "fastestLap", label: "Volta Rápida", points: 1 },
					{ id: "driverOfTheDay", label: "Piloto do Dia", points: 0 },
					{ id: "fairplay", label: "Fairplay", points: 0 },
					{
						id: "mostOvertakes",
						label: "Mais Ultrapassagens",
						points: 0,
					},
				],
			},
		],
		features: {
			tickets: false,
			hallOfFame: true,
			partners: false,
			archive: true,
		},
		nav: { ticketUrl: "", registrationUrl: "" },
		cssVars: {
			"--color-brand-primary": "#064c24",
			"--color-brand-nav": "#064c24",
			"--color-brand-nav-hover": "#15151e",
			"--color-brand-accent": "#15151e",
			"--color-brand-nav-active": "#15151e",
			"--color-brand-nav-dropdown-bg": "#15151e",
			"--color-brand-footer": "#1c1c25",
			"--color-grid-menu-bg": "#15151e",
			"--color-grid-menu-text": "#ffffff",
			"--color-grid-menu-border": "transparent",
			"--color-countdown-bg": "#15151e",
			"--color-news-bg": "transparent",
			"--color-calendars-bg": "transparent",
			"--color-standings-bg": "transparent",
			"--color-teams-bg": "transparent",
		},
		socials: {
			instagram: "https://www.instagram.com/brazukaracingleague/",
			youtube: "https://www.youtube.com/@BrazukaF1",
		},
		fallbackDriverPhoto:
			"https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmkyoezu6gp7508loqaon7skm",
		poweredBy: true,
	},
};

const tenantId = (import.meta.env.VITE_TENANT ?? "topSprint") as TenantId;

export const tenant = TENANTS[tenantId];
