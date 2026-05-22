import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useCreateAssetMutation } from "../../graphql/generated";
import { useToast } from "../../contexts/ToastContext";
import { tenant } from "../../shared/config/tenants";
import type { PointSystem } from "../../shared/config/grids";
import { DEFAULT_POINT_SYSTEM } from "../../shared/config/grids";

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
		label: "Fundos das Seções",
		vars: [
			{ key: "--color-countdown-bg", label: "Countdown" },
			{ key: "--color-news-bg", label: "Notícias" },
			{ key: "--color-news-secondary-bg", label: "Notícias (secundário)" },
			{ key: "--color-calendars-bg", label: "Calendário" },
			{ key: "--color-standings-bg", label: "Classificação" },
			{ key: "--color-standings-card-bg", label: "Classificação (linha)" },
			{ key: "--color-teams-bg", label: "Equipes" },
			{ key: "--color-drivers-bg", label: "Pilotos" },
			{ key: "--color-drivers-card-bg", label: "Pilotos (container)" },
			{ key: "--color-results-bg", label: "Resultados" },
			{ key: "--color-results-card-bg", label: "Resultados (container)" },
			{ key: "--color-results-row-odd-bg", label: "Resultados (detalhes)" },
			{ key: "--color-champions-bg", label: "Campeões" },
			{ key: "--color-profile-bg", label: "Perfil" },
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
	const [defaultPointSystem, setDefaultPointSystem] = useState<PointSystem>(DEFAULT_POINT_SYSTEM);
	const [dpsRaceText, setDpsRaceText] = useState(DEFAULT_POINT_SYSTEM.race.join(", "));
	const [dpsSprintText, setDpsSprintText] = useState((DEFAULT_POINT_SYSTEM.sprint ?? []).join(", "));
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [createAsset] = useCreateAssetMutation();
	const { showToast } = useToast();

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
				if (data.defaultPointSystem) {
					setDefaultPointSystem(data.defaultPointSystem);
					setDpsRaceText((data.defaultPointSystem.race ?? []).join(", "));
					setDpsSprintText((data.defaultPointSystem.sprint ?? []).join(", "));
				}
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

			await setDoc(doc(db, "config", "tenant"), { name: name.trim(), logoUrl: finalLogoUrl, defaultPhotoStyle, cssVars, socials, nav, features, defaultPointSystem }, { merge: true });
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
					<label key={key} className="flex items-center gap-2 cursor-pointer text-sm">
						<input
							type="checkbox"
							checked={features[key] ?? false}
							onChange={(e) => setFeatures((prev) => ({ ...prev, [key]: e.target.checked }))}
						/>
						{FEATURE_LABELS[key]}
					</label>
				))}
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
