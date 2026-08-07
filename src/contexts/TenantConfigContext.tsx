import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/adminClient";
import type { PointSystem, RaceAward } from "../shared/config/grids";
import { DEFAULT_POINT_SYSTEM, setDefaultPointSystem, setGeneralRaceAwards } from "../shared/config/grids";
import { contrastText } from "../shared/utils/color";

interface TenantConfigShape {
	name: string;
	logoUrl: string;
	defaultPhotoStyle: "portrait" | "round" | "bust";
	socials: {
		whatsapp?: string;
		instagram?: string;
		youtube?: string;
		discord?: string;
		twitch?: string;
	};
	nav: {
		regulamentoUrl?: string;
		ticketUrl?: string;
		registrationUrl?: string;
	};
	features: {
		hallOfFame: boolean;
		partners: boolean;
		archive: boolean;
	};
	cssVars: Record<string, string>;
	defaultPointSystem?: PointSystem;
	generalRaceAwards: RaceAward[];
	footerCta: string;
	hallOfFameLegacy: { enabled: boolean; text: string };
	fallbackDriverPhoto: string;
	poweredBy: boolean;
}

const defaults: TenantConfigShape = {
	name: "",
	logoUrl: "",
	defaultPhotoStyle: "portrait",
	socials: {},
	nav: {},
	features: { hallOfFame: false, partners: false, archive: false },
	cssVars: {},
	generalRaceAwards: [],
	footerCta: "Entre em contato e participe da próxima temporada",
	hallOfFameLegacy: { enabled: false, text: "" },
	fallbackDriverPhoto: "",
	poweredBy: false,
};

const AUTO_CONTRAST: Record<string, string> = {
	"--color-brand-nav": "--color-brand-nav-text",
	"--color-brand-nav-dropdown-bg": "--color-brand-nav-dropdown-text",
	"--color-brand-footer": "--color-brand-footer-text",
	"--color-grid-menu-bg": "--color-grid-menu-text",
	"--color-countdown-bg": "--color-countdown-text",
	"--color-news-bg": "--color-news-text",
	"--color-calendars-bg": "--color-calendars-text",
	"--color-standings-bg": "--color-standings-text",
	"--color-standings-card-bg": "--color-standings-card-text",
	"--color-teams-bg": "--color-teams-text",
	"--color-drivers-bg": "--color-drivers-text",
	"--color-drivers-card-bg": "--color-drivers-card-text",
	"--color-results-bg": "--color-results-text",
	"--color-results-card-bg": "--color-results-card-text",
	"--color-champions-bg": "--color-champions-text",
	"--color-champions-awards-bg": "--color-champions-awards-text",
	"--color-champions-legacy-bg": "--color-champions-legacy-text",
	"--color-profile-bg": "--color-profile-text",
	"--color-profile-nav-bg": "--color-profile-nav-text",
	"--color-profile-stats-bg": "--color-profile-stats-text",
	"--color-profile-card-bg": "--color-profile-card-text",
	"--color-archive-bg": "--color-archive-text",
};

const isHex = (c: string) => /^#[0-9a-f]{6}$/i.test(c);

function applyCssVars(vars: Record<string, string>) {
	for (const [key, value] of Object.entries(vars)) {
		document.documentElement.style.setProperty(key, value);
	}
	for (const [bgVar, textVar] of Object.entries(AUTO_CONTRAST)) {
		const bg = vars[bgVar];
		if (bg && isHex(bg)) {
			document.documentElement.style.setProperty(textVar, contrastText(bg));
		}
	}
}

const TenantConfigContext = createContext<TenantConfigShape>(defaults);

export function TenantConfigProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = useState<TenantConfigShape>(defaults);

	useEffect(() => {
		return onSnapshot(doc(db, "config", "tenant"), (snap) => {
			if (!snap.exists()) return;
			const data = snap.data();
			const name = data.name ?? "";
			document.title = name;
			const cssVars = data.cssVars ?? {};
			applyCssVars(cssVars);
			const generalRaceAwards: RaceAward[] = data.generalRaceAwards ?? [];
			setGeneralRaceAwards(generalRaceAwards);
			setDefaultPointSystem(data.defaultPointSystem ?? DEFAULT_POINT_SYSTEM);
			setConfig({
				name,
				logoUrl: data.logoUrl ?? "",
				defaultPhotoStyle: data.defaultPhotoStyle ?? "portrait",
				socials: data.socials ?? {},
				nav: data.nav ?? {},
				features: data.features ?? { hallOfFame: false, partners: false, archive: false },
				cssVars,
				defaultPointSystem: data.defaultPointSystem,
				generalRaceAwards,
				footerCta: data.footerCta ?? "Entre em contato e participe da próxima temporada",
				hallOfFameLegacy: data.hallOfFameLegacy ?? { enabled: false, text: "" },
				fallbackDriverPhoto: data.fallbackDriverPhoto ?? "",
				poweredBy: data.poweredBy ?? false,
			});
		});
	}, []);

	return (
		<TenantConfigContext.Provider value={config}>
			{children}
		</TenantConfigContext.Provider>
	);
}

export function useTenantConfig() {
	return useContext(TenantConfigContext);
}
