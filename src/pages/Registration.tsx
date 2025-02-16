import { FormEvent, useState } from "react";
import { useCreateDriverMutation } from "../graphql/generated";

export function Registration() {
	const [createDriver, { loading }] = useCreateDriverMutation();

	const [photo, setPhoto] = useState("");

	async function handleDriver(event: FormEvent) {
		event.preventDefault();

		console.log(event.target.name.value);
		console.log(event.target.stream.value);
		console.log(event.target.city.value);
		console.log(event.target.equipment.value);
		console.log(event.target.phone.value);

		await createDriver({
			variables: {
				name: event.target.name.value,
				stream: event.target.stream.value,
				city: event.target.city.value,
				equipment: event.target.equipment.value,
				phone: event.target.phone.value,
				photo,
			},
		});
	}

	return (
		<div id="cadastro" className="bg-f1-lightSilver py-10">
			<form
				onSubmit={handleDriver}
				className="flex flex-col gap-4 items-center"
			>
				<input name="name" placeholder="Nome" />
				<input name="phone" placeholder="Telefone" />
				<input name="city" placeholder="Cidade" />
				<input name="equipment" placeholder="Equipamento" />
				<input name="stream" placeholder="Stream" />
				<input name="photo" placeholder="Foto" />
				<button type="submit">Cadastrar</button>
			</form>
		</div>
	);
}
