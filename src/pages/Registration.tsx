import { FormEvent, useState } from "react";
import { useCreateDriverMutation } from "../graphql/generated";

export function Registration() {
	const [createDriver, { loading: createDriverLoading }] =
		useCreateDriverMutation();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [equipment, setEquipment] = useState("");
	const [stream, setStream] = useState("");
	const [photoFile, setPhotoFile] = useState<File | null>(null);

	const handleDriver = async (event: FormEvent) => {
		event.preventDefault();

		try {
			let photoId = null;
			if (photoFile) {
				// Upload the file to Hygraph
				const formData = new FormData();
				formData.append("fileUpload", photoFile);

				const response = await fetch(
					"https://us-west-2.cdn.hygraph.com/content/cm12mnmvz09v707n5el5f552n/master/upload",
					{
						method: "POST",
						body: formData,
					}
				);

				const { id } = await response.json();
				photoId = id;
			}

			// Create the driver with the uploaded photo ID
			await createDriver({
				variables: {
					name,
					stream,
					city,
					equipment,
					phone,
					photo: photoId ? { connect: { id: photoId } } : null,
				},
			});

			// Reset form
			setName("");
			setPhone("");
			setCity("");
			setEquipment("");
			setStream("");
			setPhotoFile(null);

			alert("Driver created successfully!");
		} catch (error) {
			console.error("Error creating driver:", error);
			alert("Failed to create driver. Please try again.");
		}
	};

	return (
		<div id="cadastro" className="bg-f1-lightSilver py-10">
			<form
				onSubmit={handleDriver}
				className="flex flex-col gap-4 items-center"
			>
				<input
					name="name"
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					name="phone"
					placeholder="Telefone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
				/>
				<input
					name="city"
					placeholder="Cidade"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					required
				/>
				<input
					name="equipment"
					placeholder="Equipamento"
					value={equipment}
					onChange={(e) => setEquipment(e.target.value)}
					required
				/>
				<input
					name="stream"
					placeholder="Stream"
					value={stream}
					onChange={(e) => setStream(e.target.value)}
					required
				/>
				<input
					type="file"
					name="photo"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							setPhotoFile(e.target.files[0]);
						}
					}}
				/>
				<button
					type="submit"
					disabled={createDriverLoading}
					className="bg-f1-red text-white px-4 py-2 rounded hover:bg-f1-darkRed transition-colors"
				>
					{createDriverLoading ? "Cadastrando..." : "Cadastrar"}
				</button>
			</form>
		</div>
	);
}
