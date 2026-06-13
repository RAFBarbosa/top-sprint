import { useTab } from "../../contexts/TabContext";
import { getGridConfig } from "../../shared/config/grids";
import { GridId } from "../../shared/config/grids";
import { useTenantConfig } from "../../contexts/TenantConfigContext";

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
	const { socials } = useTenantConfig();
	const gridConfig = getGridConfig(activeTab.id as GridId);
	const gridLabel = gridConfig?.label ?? activeTab.id;

	if (props.completed) {
		const liveUrl = props.link || socials?.youtube;
		return (
			<a
				href={liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="flex flex-col items-end leading-tight hover:opacity-90"
			>
				<span className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">
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
			<span className="text-[10px] md:text-xs uppercase tracking-wider opacity-70 text-right">
				Próxima corrida<span className="hidden md:inline"> · </span>
				<br className="md:hidden" />
				{gridLabel}
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
			<span className="text-[9px] md:text-[10px] opacity-70 tracking-tight">
				<span className="md:hidden">{shortLabel}</span>
				<span className="hidden md:inline">{label}</span>
			</span>
		</div>
	);
}
