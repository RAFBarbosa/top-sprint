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
	loading: boolean;
	saveGrids: (grids: GridConfig[]) => Promise<void>;
}

const GridsContext = createContext<GridsContextType | undefined>(undefined);

const FIRESTORE_DOC = `grids/${tenant.id}`;

function fromFirebase(firebaseGrids: Record<string, any>): GridConfig[] {
	// Firebase is authoritative — reconstruct the list in saved order.
	// For each Firebase grid, merge data fields over the matching static grid
	// (to preserve Tailwind class strings that aren't stored in Firebase).
	const staticMap = Object.fromEntries(
		(tenant.grids as any[]).map((g) => [g.id, g]),
	);
	return Object.entries(firebaseGrids).map(([id, fbGrid]) => ({
		...(staticMap[id] ?? {}),
		id,
		label: fbGrid.label ?? id,
		primaryColor: fbGrid.primaryColor ?? "#eb1c24",
		pointSystem: fbGrid.pointSystem ?? {},
		raceAwards: fbGrid.raceAwards ?? [],
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
					const merged = fromFirebase(
						snap.data() as Record<string, any>,
					);
					setGrids(merged);
					setRuntimeGrids(merged);
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
		const payload: Record<string, any> = {};
		updated.forEach((g) => {
			payload[g.id] = {
				label: g.label,
				primaryColor: g.primaryColor,
				pointSystem: g.pointSystem,
				raceAwards: g.raceAwards ?? [],
			};
		});
		await setDoc(doc(db, FIRESTORE_DOC), payload);
		setGrids(updated);
		setRuntimeGrids(updated);
	};

	return (
		<GridsContext.Provider value={{ grids, loading, saveGrids }}>
			{children}
		</GridsContext.Provider>
	);
}

export function useGrids() {
	const ctx = useContext(GridsContext);
	if (!ctx) throw new Error("useGrids must be used within GridsProvider");
	return ctx;
}
