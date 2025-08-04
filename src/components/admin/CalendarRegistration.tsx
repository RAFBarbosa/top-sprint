import { FormEvent, useState } from "react";
import {
	useCreateCalendarMutation,
	useGetCalendarsRegistrationQuery,
	useUpdateCalendarMutation,
	useCreateAssetMutation,
	GetCalendarsRegistrationDocument,
} from "../../graphql/generated";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CalendarRegistration() {
	const [formData, setFormData] = useState({
		track: "",
		round: "",
		description: "",
		date: "",
		link: "",
		active: true,
	});

	const [flagFile, setFlagFile] = useState<File | null>(null);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedCalendar, setSelectedCalendar] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [createCalendar, { loading: createCalendarLoading }] =
		useCreateCalendarMutation();
	const [updateCalendar, { loading: updateCalendarLoading }] =
		useUpdateCalendarMutation();
	const [createAsset] = useCreateAssetMutation();

	const { data: calendarsData, error: calendarsError } =
		useGetCalendarsRegistrationQuery();

	const isoToDatetimeLocal = (isoString: string) => {
		if (!isoString) return "";
		const date = new Date(isoString);
		const pad = (num: number) => num.toString().padStart(2, "0");

		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
			date.getDate()
		)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
	};

	const handleSelectCalendar = (calendar: any) => {
		setSelectedCalendar(calendar);
		setIsEditing(true);
		setFormData({
			track: calendar.track,
			round: calendar.round,
			description: calendar.description,
			date: isoToDatetimeLocal(calendar.date),
			link: calendar.link || "",
			active: calendar.active,
		});
	};

	const resetForm = () => {
		setSelectedCalendar(null);
		setIsEditing(false);
		setFormData({
			track: "",
			round: "",
			description: "",
			date: "",
			link: "",
			active: true,
		});
		setFlagFile(null);
	};

	const handleCalendar = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		if (!formData.date) {
			setStatus({
				type: "error",
				message: "Por favor, selecione uma data válida",
			});
			return;
		}

		try {
			const formattedDate = new Date(formData.date)
				.toISOString()
				.replace(/\.\d{3}Z$/, "Z");
			// Validate required fields
			if (!formData.track) throw new Error("Pista é obrigatória");
			if (!formData.round) throw new Error("Rodada é obrigatória");
			if (!formData.date) throw new Error("Data é obrigatória");

			let flagId = null;
			if (flagFile) {
				try {
					setStatus({
						type: "loading",
						message: "Enviando imagem...",
					});

					const assetResult = await createAsset({
						variables: { data: {} },
					});

					const asset = assetResult.data?.createAsset;
					const uploadData = asset?.upload?.requestPostData;
					if (!asset?.id || !uploadData?.url) {
						throw new Error("Failed to get upload data");
					}

					const formData = new FormData();
					const finalKey = uploadData.key.replace(
						"${filename}",
						encodeURIComponent(flagFile.name)
					);
					formData.append("key", finalKey);
					formData.append("policy", uploadData.policy);
					formData.append("x-amz-algorithm", uploadData.algorithm);
					formData.append("x-amz-credential", uploadData.credential);
					formData.append("x-amz-date", uploadData.date);
					formData.append("x-amz-signature", uploadData.signature);
					if (uploadData.securityToken) {
						formData.append(
							"x-amz-security-token",
							uploadData.securityToken
						);
					}
					formData.append("file", flagFile);

					const uploadResponse = await fetch(uploadData.url, {
						method: "POST",
						body: formData,
					});

					if (!uploadResponse.ok) throw new Error("Upload failed");

					flagId = asset.id;
					setUploadProgress(100);
				} catch (uploadError) {
					throw new Error(
						`Falha no upload da bandeira: ${uploadError.message}`
					);
				}
			}

			if (formData.link && !formData.link.startsWith("http")) {
				throw new Error("URL deve começar com http/https");
			}

			if (isEditing && selectedCalendar) {
				// Update existing calendar
				const result = await updateCalendar({
					variables: {
						where: { id: selectedCalendar.id },
						data: {
							track: formData.track,
							round: formData.round,
							description: formData.description,
							date: formattedDate,
							link: formData.link || null,
							active: formData.active,
							flag: flagId
								? { connect: { id: flagId } }
								: undefined,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Etapa atualizada com sucesso!",
				});
			} else {
				// Create new calendar
				const result = await createCalendar({
					variables: {
						data: {
							track: formData.track,
							round: formData.round,
							description: formData.description,
							date: formattedDate,
							link: formData.link || null,
							active: formData.active,
							flag: flagId ? { connect: { id: flagId } } : null,
						},
					},
					update(cache, { data }) {
						const existing = cache.readQuery({
							query: GetCalendarsRegistrationDocument,
						});
						if (existing && data?.createCalendar) {
							cache.writeQuery({
								query: GetCalendarsRegistrationDocument,
								data: {
									calendars: [
										data.createCalendar,
										...existing.calendars,
									],
								},
							});
						}
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Etapa cadastrada com sucesso!",
				});
			}

			resetForm();
			setUploadProgress(null);

			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			console.error("Registration error:", error);
			setStatus({
				type: "error",
				message:
					error.message || "Erro desconhecido ao cadastrar etapa",
			});
			setUploadProgress(null);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredCalendars = (
		calendarsData?.calendars
			? [...calendarsData.calendars].sort((a, b) => {
					const dateA = new Date(a.date).getTime();
					const dateB = new Date(b.date).getTime();
					return dateB - dateA;
			  })
			: []
	).filter((calendar) => {
		return searchTerm
			? Object.entries({
					track: calendar.track,
					round: calendar.round,
					description: calendar.description,
					date: calendar.date,
					link: calendar.link,
			  }).some(([_, value]) =>
					value
						?.toString()
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			  )
			: true;
	});

	if (calendarsError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar etapas: {calendarsError.message}
				</div>
			</div>
		);
	}

	const formatDateWithCapitalizedMonth = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });

		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} de ${capitalizedMonth} de ${year}`;
	};

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Calendar Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Buscar calendários (pista, rodada, data)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 md:min-h-110 overflow-y-auto pr-2">
					{filteredCalendars.length > 0 ? (
						filteredCalendars.map((calendar) => (
							<li key={calendar.id}>
								<button
									onClick={() =>
										handleSelectCalendar(calendar)
									}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedCalendar?.id === calendar.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex flex-col items-start truncate">
										<span className="truncate max-w-48">
											{calendar.track}
										</span>
										<div className="flex flex-col items-start">
											<span className="text-xs text-gray-500">
												• {calendar.round}
											</span>
										</div>
										<div className="flex flex-col items-start">
											<span className="text-xs text-gray-500">
												•{" "}
												{formatDateWithCapitalizedMonth(
													calendar.date
												)}
											</span>
										</div>
									</div>

									<div>
										{calendar.flag?.url && (
											<img
												src={calendar.flag.url}
												alt={`Bandeira ${calendar.track}`}
												className="max-w-8 max-h-8 object-cover scale-150 mr-2"
											/>
										)}
									</div>
								</button>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma etapa encontrada
						</li>
					)}
				</ul>
			</div>

			{/* Registration Form */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handleCalendar}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Etapa"
								: "Cadastrar Nova Etapa"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Nova Etapa
							</button>
						)}
					</div>

					{status.type !== "idle" && (
						<div
							className={`w-full p-4 rounded-md mb-4 ${
								status.type === "error"
									? "bg-red-100 border border-red-400 text-red-700"
									: status.type === "success"
									? "bg-green-100 border border-green-400 text-green-700"
									: "bg-blue-100 border border-blue-400 text-blue-700"
							}`}
						>
							<div className="flex items-center gap-2">
								{status.type === "loading" && (
									<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
								)}
								<span>{status.message}</span>
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block mb-1">Pista *</label>
							<input
								name="track"
								value={formData.track}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Rodada *</label>
							<input
								name="round"
								value={formData.round}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Descrição</label>
							<input
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Data *</label>
							<input
								type="datetime-local"
								name="date"
								value={formData.date}
								onChange={(e) => {
									const isoDate = new Date(
										e.target.value
									).toISOString();
									setFormData({
										...formData,
										date: e.target.value,
									});
								}}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Link</label>
							<input
								name="link"
								value={formData.link}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>
						<div className="flex items-center gap-2 mb-4">
							<label className="block">Ativo:</label>
							<input
								type="checkbox"
								checked={formData.active}
								onChange={(e) =>
									setFormData({
										...formData,
										active: e.target.checked,
									})
								}
								className="w-4 h-4"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block mb-1">Bandeira</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									e.target.files?.[0] &&
									setFlagFile(e.target.files[0])
								}
								className="w-full p-2 border rounded h-11"
							/>
							{flagFile && (
								<p className="text-sm mt-1 text-gray-600">
									Arquivo selecionado: {flagFile.name}
								</p>
							)}
						</div>

						{isEditing &&
							selectedCalendar?.flag?.url &&
							!flagFile && (
								<div className="md:col-span-2">
									<span className="block mb-1">
										Bandeira atual:
									</span>
									<img
										src={selectedCalendar.flag.url}
										alt={`Bandeira ${selectedCalendar.track}`}
										className="h-auto w-full md:w-1/5 mx-auto object-cover border border-gray-300"
									/>
								</div>
							)}

						{uploadProgress !== null && (
							<div className="md:col-span-2 w-full bg-gray-200 rounded-full h-2.5">
								<div
									className="bg-f1-red h-2.5 rounded-full"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={
							createCalendarLoading || updateCalendarLoading
						}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createCalendarLoading || updateCalendarLoading
							? isEditing
								? "Atualizando..."
								: "Cadastrando..."
							: isEditing
							? "Atualizar"
							: "Cadastrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
