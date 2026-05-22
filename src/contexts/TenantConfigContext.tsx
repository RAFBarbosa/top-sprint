import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/adminClient";
import { tenant } from "../shared/config/tenants";
import type { PointSystem } from "../shared/config/grids";
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
}

const defaultCssVars = Object.fromEntries(
	Object.entries(tenant.cssVars).filter(([k]) => k.startsWith("--color-brand") || k.startsWith("--color-grid") || k.startsWith("--color-countdown") || k.startsWith("--color-news") || k.startsWith("--color-calendars") || k.startsWith("--color-standings") || k.startsWith("--color-teams") || k.startsWith("--color-drivers") || k.startsWith("--color-results") || k.startsWith("--color-champions") || k.startsWith("--color-profile")),
);

const defaults: TenantConfigShape = {
	name: tenant.name,
	logoUrl: tenant.logo.url,
	defaultPhotoStyle: tenant.defaultPhotoStyle ?? "portrait",
	socials: tenant.socials ?? {},
	nav: tenant.nav ?? {},
	features: tenant.features,
	cssVars: defaultCssVars,
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
	"--color-profile-bg": "--color-profile-text",
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
			const name = data.name ?? tenant.name;
			document.title = name;
			const cssVars = { ...defaultCssVars, ...(data.cssVars ?? {}) };
			applyCssVars(cssVars);
			setConfig({
				name,
				logoUrl: data.logoUrl ?? tenant.logo.url,
				defaultPhotoStyle: data.defaultPhotoStyle ?? tenant.defaultPhotoStyle ?? "portrait",
				socials: data.socials ?? tenant.socials ?? {},
				nav: data.nav ?? tenant.nav ?? {},
				features: data.features ?? tenant.features,
				cssVars,
				defaultPointSystem: data.defaultPointSystem,
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
