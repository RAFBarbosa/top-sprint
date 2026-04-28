import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/adminClient";
import { tenant } from "../shared/config/tenants";
import { setRuntimeGrids, type GridConfig } from "../shared/config/grids";

interface GridsContextType {
	grids: GridConfig[];
	activeGrids: GridConfig[];
	loading: boolean;
	saveGrids: (grids: GridConfig[]) => Promise<void>;
}

const GridsContext = createContext<GridsContextType | undefined>(undefined);

const FIRESTORE_DOC = `grids/${tenant.id}`;

function fromFirebase(firebaseData: any): GridConfig[] {
	// Firebase stores grids as an array to preserve order
	if (Array.isArray(firebaseData.grids)) {
		const staticMap = Object.fromEntries(
			(tenant.grids as any[]).map((g) => [g.id, g]),
		);
		return firebaseData.grids.map((fbGrid: any) => ({
			...(staticMap[fbGrid.id] ?? {}),
			id: fbGrid.id,
			label: fbGrid.label ?? fbGrid.id,
			active: fbGrid.active ?? true,
			primaryColor: fbGrid.primaryColor ?? "#eb1c24",
			...(fbGrid.pointSystem !== undefined ? { pointSystem: fbGrid.pointSystem } : {}),
			raceAwards: fbGrid.raceAwards ?? [],
			reservesEarnPoints: fbGrid.reservesEarnPoints ?? false,
		})) as GridConfig[];
	}

	// Fallback for old object format
	const staticMap = Object.fromEntries(
		(tenant.grids as any[]).map((g) => [g.id, g]),
	);
	return Object.entries(firebaseData).map(([id, fbGrid]: [string, any]) => ({
		...(staticMap[id] ?? {}),
		id,
		label: fbGrid.label ?? id,
		active: fbGrid.active ?? true,
		primaryColor: fbGrid.primaryColor ?? "#eb1c24",
		...(fbGrid.pointSystem !== undefined ? { pointSystem: fbGrid.pointSystem } : {}),
		raceAwards: fbGrid.raceAwards ?? [],
		reservesEarnPoints: fbGrid.reservesEarnPoints ?? false,
	})) as GridConfig[];
}

export function GridsProvider({ children }: { children: ReactNode }) {
	const [grids, setGrids] = useState<GridConfig[]>(
		tenant.grids as GridConfig[],
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDoc(doc(db, FIRESTORE_DOC));
				if (snap.exists()) {
					const merged = fromFirebase(snap.data());
					setGrids(merged);
					setRuntimeGrids(merged.filter((g) => g.active !== false));
				} else {
					setRuntimeGrids(tenant.grids as GridConfig[]);
				}
			} catch (e) {
				console.error("Failed to load grids from Firebase", e);
				setRuntimeGrids(tenant.grids as GridConfig[]);
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
				pointSystem: g.pointSystem,
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
