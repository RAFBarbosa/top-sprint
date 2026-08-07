import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/adminClient";
import { setRuntimeGrids, type GridConfig } from "../shared/config/grids";

const TENANT_ID = import.meta.env.VITE_TENANT as string;

interface GridsContextType {
	grids: GridConfig[];
	activeGrids: GridConfig[];
	loading: boolean;
	saveGrids: (grids: GridConfig[]) => Promise<void>;
}

const GridsContext = createContext<GridsContextType | undefined>(undefined);

const FIRESTORE_DOC = `grids/${TENANT_ID}`;

function fromFirebase(firebaseData: any): GridConfig[] {
	// Firebase stores grids as an array to preserve order
	if (Array.isArray(firebaseData.grids)) {
		return firebaseData.grids.map((fbGrid: any) => ({
			id: fbGrid.id,
			label: fbGrid.label ?? fbGrid.id,
			active: fbGrid.active ?? true,
			primaryColor: fbGrid.primaryColor ?? "#eb1c24",
			...(fbGrid.standingsTitle !== undefined ? { standingsTitle: fbGrid.standingsTitle } : {}),
			...(fbGrid.secondaryColor !== undefined ? { secondaryColor: fbGrid.secondaryColor } : {}),
			...(fbGrid.rowHoverColor !== undefined ? { rowHoverColor: fbGrid.rowHoverColor } : {}),
			...(fbGrid.accentHoverColor !== undefined ? { accentHoverColor: fbGrid.accentHoverColor } : {}),
			...(fbGrid.countdownBgColor !== undefined ? { countdownBgColor: fbGrid.countdownBgColor } : {}),
			...(fbGrid.standingsBgColor !== undefined ? { standingsBgColor: fbGrid.standingsBgColor } : {}),
			...(fbGrid.standingsBgEndColor !== undefined ? { standingsBgEndColor: fbGrid.standingsBgEndColor } : {}),
			...(fbGrid.podiumBgColor !== undefined ? { podiumBgColor: fbGrid.podiumBgColor } : {}),
			...(fbGrid.pointSystem !== undefined ? { pointSystem: fbGrid.pointSystem } : {}),
			raceAwards: fbGrid.raceAwards ?? [],
			reservesEarnPoints: fbGrid.reservesEarnPoints ?? false,
		})) as GridConfig[];
	}

	// Fallback for old object format
	return Object.entries(firebaseData).map(([id, fbGrid]: [string, any]) => ({
		id,
		label: fbGrid.label ?? id,
		active: fbGrid.active ?? true,
		primaryColor: fbGrid.primaryColor ?? "#eb1c24",
		...(fbGrid.standingsTitle !== undefined ? { standingsTitle: fbGrid.standingsTitle } : {}),
		...(fbGrid.secondaryColor !== undefined ? { secondaryColor: fbGrid.secondaryColor } : {}),
		...(fbGrid.rowHoverColor !== undefined ? { rowHoverColor: fbGrid.rowHoverColor } : {}),
		...(fbGrid.accentHoverColor !== undefined ? { accentHoverColor: fbGrid.accentHoverColor } : {}),
		...(fbGrid.countdownBgColor !== undefined ? { countdownBgColor: fbGrid.countdownBgColor } : {}),
		...(fbGrid.standingsBgColor !== undefined ? { standingsBgColor: fbGrid.standingsBgColor } : {}),
		...(fbGrid.standingsBgEndColor !== undefined ? { standingsBgEndColor: fbGrid.standingsBgEndColor } : {}),
		...(fbGrid.podiumBgColor !== undefined ? { podiumBgColor: fbGrid.podiumBgColor } : {}),
		...(fbGrid.pointSystem !== undefined ? { pointSystem: fbGrid.pointSystem } : {}),
		raceAwards: fbGrid.raceAwards ?? [],
		reservesEarnPoints: fbGrid.reservesEarnPoints ?? false,
	})) as GridConfig[];
}

export function GridsProvider({ children }: { children: ReactNode }) {
	const [grids, setGrids] = useState<GridConfig[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDoc(doc(db, FIRESTORE_DOC));
				if (snap.exists()) {
					const merged = fromFirebase(snap.data());
					setGrids(merged);
					setRuntimeGrids(merged.filter((g) => g.active !== false));
				}
			} catch (e) {
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const saveGrids = async (updated: GridConfig[]) => {
		const payload = {
			grids: updated.map((g) => ({
				id: g.id,
				label: g.label,
				active: g.active ?? true,
				primaryColor: g.primaryColor,
				...(g.standingsTitle !== undefined ? { standingsTitle: g.standingsTitle } : {}),
				...(g.secondaryColor !== undefined ? { secondaryColor: g.secondaryColor } : {}),
				...(g.rowHoverColor !== undefined ? { rowHoverColor: g.rowHoverColor } : {}),
				...(g.accentHoverColor !== undefined ? { accentHoverColor: g.accentHoverColor } : {}),
				...(g.countdownBgColor !== undefined ? { countdownBgColor: g.countdownBgColor } : {}),
				...(g.standingsBgColor !== undefined ? { standingsBgColor: g.standingsBgColor } : {}),
				...(g.standingsBgEndColor !== undefined ? { standingsBgEndColor: g.standingsBgEndColor } : {}),
				...(g.podiumBgColor !== undefined ? { podiumBgColor: g.podiumBgColor } : {}),
				pointSystem: g.pointSystem ? Object.fromEntries(Object.entries(g.pointSystem).filter(([, v]) => v !== undefined)) : {},
				raceAwards: g.raceAwards ?? [],
				reservesEarnPoints: g.reservesEarnPoints ?? false,
			})),
		};
		await setDoc(doc(db, FIRESTORE_DOC), payload);
		setGrids(updated);
		setRuntimeGrids(updated.filter((g) => g.active !== false));
	};

	const activeGrids = grids.filter((g) => g.active !== false);

	return (
		<GridsContext.Provider
			value={{ grids, activeGrids, loading, saveGrids }}
		>
			{children}
		</GridsContext.Provider>
	);
}

export function useGrids() {
	const ctx = useContext(GridsContext);
	if (!ctx) throw new Error("useGrids must be used within GridsProvider");
	return ctx;
}
