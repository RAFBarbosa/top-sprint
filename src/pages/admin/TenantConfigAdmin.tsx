import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, getDocs, collection, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useGrids } from "../../contexts/GridsContext";
import { useCreateAssetMutation } from "../../graphql/generated";
import { useToast } from "../../contexts/ToastContext";
import { tenant } from "../../shared/config/tenants";
import type { PointSystem, RaceAward } from "../../shared/config/grids";
import { DEFAULT_POINT_SYSTEM } from "../../shared/config/grids";
import { Toggle } from "../../components/admin/ui/Toggle";

const COLOR_GROUPS = [
	{
		label: "Cores Principais",
		vars: [
			{ key: "--color-brand-primary", label: "Primária" },
			{ key: "--color-brand-accent", label: "Secundária" },
			{ key: "--color-brand-footer", label: "Rodapé" },
		],
	},
	{
		label: "Barra de Navegação",
		vars: [
			{ key: "--color-brand-nav", label: "Fundo" },
			{ key: "--color-brand-nav-hover", label: "Link hover" },
			{ key: "--color-brand-nav-active", label: "Link ativo" },
			{ key: "--color-brand-nav-dropdown-bg", label: "Dropdown fundo" },
		],
	},
	{
		label: "Menu dos Grids",
		vars: [
			{ key: "--color-grid-menu-bg", label: "Fundo" },
			{ key: "--color-grid-menu-border", label: "Borda" },
		],
	},
	{
		label: "Countdown",
		vars: [
			{ key: "--color-countdown-bg", label: "Fundo" },
		],
	},
	{
		label: "Notícias",
		vars: [
			{ key: "--color-news-bg", label: "Fundo" },
			{ key: "--color-news-secondary-bg", label: "Secundário" },
		],
	},
	{
		label: "Calendário",
		vars: [
			{ key: "--color-calendars-bg", label: "Fundo" },
		],
	},
	{
		label: "Classificação",
		vars: [
			{ key: "--color-standings-bg", label: "Fundo" },
			{ key: "--color-standings-card-bg", label: "Linha" },
		],
	},
	{
		label: "Equipes",
		vars: [
			{ key: "--color-teams-bg", label: "Fundo" },
		],
	},
	{
		label: "Pilotos",
		vars: [
			{ key: "--color-drivers-bg", label: "Fundo" },
			{ key: "--color-drivers-card-bg", label: "Container" },
		],
	},
	{
		label: "Resultados",
		vars: [
			{ key: "--color-results-bg", label: "Fundo" },
			{ key: "--color-results-card-bg", label: "Container" },
			{ key: "--color-results-row-odd-bg", label: "Detalhes" },
		],
	},
	{
		label: "Campeões",
		vars: [
			{ key: "--color-champions-bg", label: "Fundo" },
			{ key: "--color-champions-awards-bg", label: "Prêmios" },
			{ key: "--color-champions-legacy-bg", label: "Legado (texto)" },
		],
	},
	{
		label: "Perfil",
		vars: [
			{ key: "--color-profile-bg", label: "Fundo" },
			{ key: "--color-profile-nav-bg", label: "Navegação" },
			{ key: "--color-profile-stats-bg", label: "Container" },
			{ key: "--color-profile-card-bg", label: "Estatísticas" },
		],
	},
] as const;

const SOCIAL_KEYS = ["whatsapp", "instagram", "youtube", "discord", "twitch"] as const;
const FEATURE_KEYS = ["hallOfFame", "partners", "archive"] as const;
const FEATURE_LABELS: Record<typeof FEATURE_KEYS[number], string> = {
	hallOfFame: "Hall da Fama",
	partners: "Parceiros",
	archive: "Arquivo",
};

export default function TenantConfigAdmin() {
	const [name, setName] = useState("");
	const [logoUrl, setLogoUrl] = useState("");
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState("");
	const [defaultPhotoStyle, setDefaultPhotoStyle] = useState<"portrait" | "round" | "bust">("portrait");
	const [cssVars, setCssVars] = useState<Record<string, string>>(
		Object.fromEntries(Object.entries(tenant.cssVars).filter(([k]) => k.startsWith("--color-")))
	);
	const [socials, setSocials] = useState<Record<string, string>>({});
	const [nav, setNav] = useState<Record<string, string>>({});
	const [features, setFeatures] = useState<Record<string, boolean>>({ hallOfFame: true, partners: true, archive: true });
	const [footerCta, setFooterCta] = useState("Entre em contato e participe da próxima temporada");
	const [legacyEnabled, setLegacyEnabled] = useState(false);
	const [legacyText, setLegacyText] = useState("");
	const [defaultPointSystem, setDefaultPointSystem] = useState<PointSystem>(DEFAULT_POINT_SYSTEM);
	const [generalRaceAwards, setGeneralRaceAwards] = useState<RaceAward[]>([]);
	const [dpsRaceText, setDpsRaceText] = useState(DEFAULT_POINT_SYSTEM.race.join(", "));
	const [dpsSprintText, setDpsSprintText] = useState((DEFAULT_POINT_SYSTEM.sprint ?? []).join(", "));
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [createAsset] = useCreateAssetMutation();
	const { showToast } = useToast();
	const { grids, saveGrids } = useGrids();

	useEffect(() => {
		getDoc(doc(db, "config", "tenant")).then((snap) => {
			if (snap.exists()) {
				const data = snap.data();
				setName(data.name ?? "");
				setLogoUrl(data.logoUrl ?? "");
				setLogoPreview(data.logoUrl ?? "");
				setDefaultPhotoStyle(data.defaultPhotoStyle ?? "portrait");
				setCssVars((prev) => ({ ...prev, ...(data.cssVars ?? {}) }));
				setSocials(data.socials ?? {});
				setNav(data.nav ?? {});
				setFeatures(data.features ?? { hallOfFame: true, partners: true, archive: true });
				setFooterCta(data.footerCta ?? "Entre em contato e participe da próxima temporada");
				setLegacyEnabled(data.hallOfFameLegacy?.enabled ?? false);
				setLegacyText(data.hallOfFameLegacy?.text ?? "");
				if (data.defaultPointSystem) {
					setDefaultPointSystem(data.defaultPointSystem);
					setDpsRaceText((data.defaultPointSystem.race ?? []).join(", "));
					setDpsSprintText((data.defaultPointSystem.sprint ?? []).join(", "));
				}
				setGeneralRaceAwards(data.generalRaceAwards ?? []);
			}
		}).finally(() => setLoading(false));
	}, []);

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setLogoFile(file);
		setLogoPreview(URL.createObjectURL(file));
	};

	const handleSave = async () => {
		if (!name.trim()) {
			showToast("error", "Nome é obrigatório");
			return;
		}

		setSaving(true);
		try {
			let finalLogoUrl = logoUrl;

			if (logoFile) {
				const assetResult = await createAsset({ variables: { data: {} } });
				const asset = assetResult.data?.createAsset;
				const uploadData = asset?.upload?.requestPostData;
				if (!asset?.id || !uploadData?.url) throw new Error("Falha ao obter dados de upload");

				const uploadForm = new FormData();
				const finalKey = uploadData.key.replace("${filename}", encodeURIComponent(logoFile.name));
				uploadForm.append("key", finalKey);
				uploadForm.append("policy", uploadData.policy);
				uploadForm.append("x-amz-algorithm", uploadData.algorithm);
				uploadForm.append("x-amz-credential", uploadData.credential);
				uploadForm.append("x-amz-date", uploadData.date);
				uploadForm.append("x-amz-signature", uploadData.signature);
				if (uploadData.securityToken) uploadForm.append("x-amz-security-token", uploadData.securityToken);
				uploadForm.append("file", logoFile);

				const uploadResponse = await fetch(uploadData.url, { method: "POST", body: uploadForm });
				if (!uploadResponse.ok) throw new Error("Upload falhou");

				finalLogoUrl = asset.url ?? "";
				setLogoUrl(finalLogoUrl);
				setLogoFile(null);
			}

			await setDoc(doc(db, "config", "tenant"), { name: name.trim(), logoUrl: finalLogoUrl, defaultPhotoStyle, cssVars, socials, nav, features, footerCta, hallOfFameLegacy: { enabled: legacyEnabled, text: legacyText }, defaultPointSystem, generalRaceAwards }, { merge: true });
			showToast("success", "Configuração salva");
		} catch (err: any) {
			showToast("error", err.message || "Erro ao salvar");
		} finally {
			setSaving(false);
		}
	};

	const parsePointsArray = (raw: string): number[] =>
		raw.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));

	const updateDps = (field: keyof PointSystem, value: any) =>
		setDefaultPointSystem((prev) => ({ ...prev, [field]: value }));

	if (loading) return <p className="text-sm text-f1-lighterCarbon">Carregando...</p>;

	return (
		<div className="max-w-2xl space-y-6">
			<h2 className="text-xl font-bold">Configuração do Site</h2>

			<div className="space-y-1">
				<label className="text-sm font-medium">Nome da Liga</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
					placeholder="Ex: CRT Cup"
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Logo</label>
				<div className="flex items-center gap-4">
					{logoPreview && (
						<img src={logoPreview} alt="Logo" className="h-12 object-contain" />
					)}
					<label className="px-3 py-2 border border-black/20 rounded text-sm cursor-pointer hover:border-f1-red duration-120">
						{logoFile ? logoFile.name : "Escolher imagem"}
						<input
							type="file"
							accept="image/*"
							onChange={handleLogoChange}
							className="hidden"
						/>
					</label>
				</div>
			</div>

			<div className="space-y-1">
				<label className="text-sm font-medium">Estilo de Foto dos Pilotos</label>
				<div className="flex gap-3">
					{(["portrait", "round", "bust"] as const).map((style) => (
						<label key={style} className="flex items-center gap-1.5 cursor-pointer text-sm">
							<input
								type="radio"
								name="photoStyle"
								value={style}
								checked={defaultPhotoStyle === style}
								onChange={() => setDefaultPhotoStyle(style)}
							/>
							{style === "portrait" ? "Retrato" : style === "round" ? "Redondo" : "Busto"}
						</label>
					))}
				</div>
			</div>

			{COLOR_GROUPS.map((group) => (
				<div key={group.label} className="space-y-2">
					<label className="text-sm font-medium">{group.label}</label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{group.vars.map(({ key, label }) => (
							<div key={key}>
								<label className="text-xs text-f1-lighterCarbon block mb-1">{label}</label>
								<div className="flex gap-2">
									<input
										type="color"
										value={cssVars[key] ?? "#000000"}
										onChange={(e) => setCssVars((prev) => ({ ...prev, [key]: e.target.value }))}
										className="h-10 w-12 border rounded cursor-pointer p-0.5 shrink-0"
									/>
									<input
										type="text"
										value={cssVars[key] ?? ""}
										onChange={(e) => setCssVars((prev) => ({ ...prev, [key]: e.target.value }))}
										className="flex-1 p-2 border rounded h-10 text-sm font-mono"
										placeholder="padrão do tema"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="space-y-2">
				<label className="text-sm font-medium">Redes Sociais</label>
				{SOCIAL_KEYS.map((key) => (
					<div key={key} className="flex items-center gap-2">
						<span className="text-sm w-24 capitalize">{key}</span>
						<input
							type="url"
							value={socials[key] ?? ""}
							onChange={(e) => setSocials((prev) => ({ ...prev, [key]: e.target.value }))}
							className="flex-1 border border-black/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-f1-red"
							placeholder={`URL do ${key}`}
						/>
					</div>
				))}
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Links de Navegação</label>
				<div className="flex items-center gap-2">
					<span className="text-sm w-24">Ticket</span>
					<input
						type="url"
						value={nav.ticketUrl ?? ""}
						onChange={(e) => setNav((prev) => ({ ...prev, ticketUrl: e.target.value }))}
						className="flex-1 border border-black/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-f1-red"
						placeholder="URL tickets"
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm w-24">Inscrição</span>
					<input
						type="url"
						value={nav.registrationUrl ?? ""}
						onChange={(e) => setNav((prev) => ({ ...prev, registrationUrl: e.target.value }))}
						className="flex-1 border border-black/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-f1-red"
						placeholder="URL de inscrição"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Funcionalidades</label>
				{FEATURE_KEYS.map((key) => (
					<Toggle
						key={key}
						checked={features[key] ?? false}
						onChange={(v) => setFeatures((prev) => ({ ...prev, [key]: v }))}
						label={FEATURE_LABELS[key]}
					/>
				))}
			</div>

			<div className="space-y-1">
				<label className="text-sm font-medium">Rodapé</label>
				<input
					type="text"
					value={footerCta}
					onChange={(e) => setFooterCta(e.target.value)}
					className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
					placeholder="Ex: Entre em contato e participe da próxima temporada"
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Hall da Fama — Legado</label>
				<Toggle checked={legacyEnabled} onChange={setLegacyEnabled} label="Mostrar seção de legado" />
				{legacyEnabled && (
					<textarea
						value={legacyText}
						onChange={(e) => setLegacyText(e.target.value)}
						rows={4}
						className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
						placeholder="Texto descritivo do legado..."
					/>
				)}
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Sistema de Pontos Padrão</label>
				<p className="text-xs text-f1-lighterCarbon">Aplicado a novos grids. Cada grid pode sobrescrever.</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">Corrida (separado por vírgula)</label>
						<input
							type="text"
							value={dpsRaceText}
							onChange={(e) => { setDpsRaceText(e.target.value); updateDps("race", parsePointsArray(e.target.value)); }}
							className="w-full border border-black/20 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-f1-red"
							placeholder="25, 18, 15..."
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">Sprint (separado por vírgula)</label>
						<input
							type="text"
							value={dpsSprintText}
							onChange={(e) => { setDpsSprintText(e.target.value); updateDps("sprint", parsePointsArray(e.target.value)); }}
							className="w-full border border-black/20 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-f1-red"
							placeholder="8, 7, 6..."
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">Bônus Pole</label>
						<input
							type="number"
							value={defaultPointSystem.poleBonus ?? 0}
							onChange={(e) => updateDps("poleBonus", parseInt(e.target.value) || 0)}
							className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
							min={0}
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">Bônus Presença</label>
						<input
							type="number"
							value={defaultPointSystem.presenceBonus ?? 0}
							onChange={(e) => updateDps("presenceBonus", parseInt(e.target.value) || 0)}
							className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
							min={0}
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">Referência Cards</label>
						<input
							type="number"
							value={defaultPointSystem.maxRacecraftPoints ?? 20}
							onChange={(e) => updateDps("maxRacecraftPoints", parseInt(e.target.value) || 20)}
							className="w-full border border-black/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-f1-red"
							min={1}
						/>
					</div>
					<div className="col-span-2">
						<Toggle
							checked={defaultPointSystem.reservesScore ?? false}
							onChange={(v) => updateDps("reservesScore", v)}
							label="Reservas pontuam"
						/>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				<div className="flex justify-between items-center">
					<label className="text-sm font-medium">Prêmios Gerais (todos os grids)</label>
					<div className="flex gap-2">
					{(() => {
						const labelGroups = new Map<string, RaceAward[]>();
						generalRaceAwards.forEach((a) => {
							const key = a.label.trim().toLowerCase();
							if (!labelGroups.has(key)) labelGroups.set(key, []);
							labelGroups.get(key)!.push(a);
						});
						const hasDupes = Array.from(labelGroups.values()).some((g) => g.length > 1);
						return hasDupes ? (
							<button
								type="button"
								onClick={async () => {
									const snap = await getDocs(collection(db, "race_results"));
									const labelGroups = new Map<string, RaceAward[]>();
									generalRaceAwards.forEach((a) => {
										const key = a.label.trim().toLowerCase();
										if (!labelGroups.has(key)) labelGroups.set(key, []);
										labelGroups.get(key)!.push(a);
									});
									const consolidated: RaceAward[] = [];
									for (const [, group] of labelGroups) {
										if (group.length === 1) { consolidated.push(group[0]); continue; }
										// Pick the first as canonical, merge the rest into it
										const canonical = group[0];
										const aliases = group.slice(1).map((a) => a.id);
										// Update all results: rename alias fields to canonical id
										for (const resultDoc of snap.docs) {
											const data = resultDoc.data();
											const updates: Record<string, any> = {};
											let changed = false;
											aliases.forEach((oldId) => {
												if (data[oldId] !== undefined) {
													updates[canonical.id] = data[oldId];
													updates[oldId] = deleteField();
													changed = true;
												}
											});
											if (changed) await updateDoc(resultDoc.ref, updates);
										}
										consolidated.push(canonical);
									}
									setGeneralRaceAwards(consolidated);
									await setDoc(doc(db, "config", "tenant"), { generalRaceAwards: consolidated }, { merge: true });
									showToast("success", "Prêmios consolidados");
								}}
								className="text-xs px-3 py-1 border border-amber-300 text-amber-700 rounded hover:bg-amber-50 cursor-pointer"
							>
								Consolidar duplicados
							</button>
						) : null;
					})()}
					{grids.some((g) => (g.raceAwards ?? []).length > 0) && (
						<button
							type="button"
							onClick={async () => {
								// Collect unique awards across grids, grouping by label (case-insensitive)
								const byLabel = new Map<string, RaceAward>();
								grids.forEach((g) => (g.raceAwards ?? []).forEach((a) => {
									const key = a.label.trim().toLowerCase();
									if (!byLabel.has(key)) byLabel.set(key, a);
								}));
								const toPromote = Array.from(byLabel.values()).filter(
									(a) => !generalRaceAwards.some(
										(g) => g.label.trim().toLowerCase() === a.label.trim().toLowerCase(),
									),
								);
								if (toPromote.length === 0) { showToast("error", "Nenhum prêmio novo para migrar"); return; }
								const merged = [...generalRaceAwards, ...toPromote];
								setGeneralRaceAwards(merged);
								// Strip from all grids, matching by label
								const promotedLabels = new Set(toPromote.map((p) => p.label.trim().toLowerCase()));
								const updatedGrids = grids.map((g) => ({
									...g,
									raceAwards: (g.raceAwards ?? []).filter(
										(a) => !promotedLabels.has(a.label.trim().toLowerCase()),
									),
								}));
								await Promise.all([
									saveGrids(updatedGrids),
									setDoc(doc(db, "config", "tenant"), { generalRaceAwards: merged }, { merge: true }),
								]);
								showToast("success", `${toPromote.length} prêmio(s) migrado(s)`);
							}}
							className="text-xs px-3 py-1 border border-amber-300 text-amber-700 rounded hover:bg-amber-50 cursor-pointer"
						>
							Migrar dos grids
						</button>
					)}
					<button
						type="button"
						onClick={() => setGeneralRaceAwards((prev) => [...prev, { id: `award_${Date.now()}`, label: "", points: 0 }])}
						className="text-xs px-3 py-1 border rounded hover:bg-f1-red/10 cursor-pointer"
					>
						+ Adicionar
					</button>
					</div>
				</div>
				{generalRaceAwards.length === 0 && (
					<p className="text-xs text-f1-lighterCarbon">Nenhum prêmio geral configurado.</p>
				)}
				<div className="space-y-2">
					{generalRaceAwards.map((award) => (
						<div key={award.id} className="grid grid-cols-[1fr_80px_32px] gap-2 items-center">
							<input
								type="text"
								value={award.label}
								onChange={(e) => setGeneralRaceAwards((prev) => prev.map((a) => a.id === award.id ? { ...a, label: e.target.value } : a))}
								className="p-2 border rounded h-9 text-sm"
								placeholder="Ex: Volta Rápida"
							/>
							<input
								type="number"
								value={award.points}
								onChange={(e) => setGeneralRaceAwards((prev) => prev.map((a) => a.id === award.id ? { ...a, points: parseInt(e.target.value) || 0 } : a))}
								className="p-2 border rounded h-9 text-sm text-center"
								placeholder="Pts"
								min={0}
							/>
							<button
								type="button"
								onClick={() => setGeneralRaceAwards((prev) => prev.filter((a) => a.id !== award.id))}
								className="h-9 w-8 flex items-center justify-center rounded border border-red-200 text-red-400 hover:bg-red-50 cursor-pointer text-sm"
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={handleSave}
				disabled={saving}
				className="px-4 py-2 bg-f1-red text-white text-sm rounded hover:opacity-80 disabled:opacity-50 cursor-pointer duration-120"
			>
				{saving ? "Salvando..." : "Salvar"}
			</button>
		</div>
	);
}
