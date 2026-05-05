import { useTab } from "../../contexts/TabContext";
import { getGridConfig } from "../../shared/config/grids";
import { GridId } from "../../shared/config/grids";

interface CountdownRendererProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
	link?: string;
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export function CountdownRenderer(props: CountdownRendererProps) {
	const { activeTab } = useTab();
	const gridConfig = getGridConfig(activeTab.id as GridId);
	const gridLabel = gridConfig?.label ?? activeTab.id;

	if (props.completed) {
		return (
			<a
				href={props.link}
				target="_blank"
				className="flex flex-col items-end leading-tight hover:opacity-90"
			>
				<span className="text-[10px] md:text-xs uppercase tracking-wider text-white/70">
					Grid {gridLabel} · ao vivo
				</span>
				<span className="font-bold text-sm uppercase">
					Clique para assistir
				</span>
			</a>
		);
	}

	return (
		<div className="flex flex-col items-end leading-tight gap-1">
			<span className="text-[10px] md:text-xs uppercase tracking-wider text-white/70">
				Próxima corrida · {gridLabel}
			</span>
			<div className="flex items-baseline gap-2">
				<Unit
					value={pad(props.days)}
					shortLabel="D"
					label={props.days === 1 ? "DIA" : "DIAS"}
				/>
				<Unit
					value={pad(props.hours)}
					shortLabel="H"
					label={props.hours === 1 ? "HR" : "HRS"}
				/>
				<Unit value={pad(props.minutes)} shortLabel="M" label="MIN" />
				<Unit value={pad(props.seconds)} shortLabel="S" label="SEG" />
			</div>
		</div>
	);
}

function Unit({
	value,
	label,
	shortLabel,
}: {
	value: string;
	label: string;
	shortLabel: string;
}) {
	return (
		<div className="flex items-baseline gap-0.5">
			<span className="font-bold text-sm md:text-base leading-none tabular-nums">
				{value}
			</span>
			<span className="text-[9px] md:text-[10px] text-white/70 tracking-tight">
				<span className="md:hidden">{shortLabel}</span>
				<span className="hidden md:inline">{label}</span>
			</span>
		</div>
	);
}
