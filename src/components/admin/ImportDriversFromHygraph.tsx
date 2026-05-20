import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/adminClient";

const HYGRAPH_QUERY = `
  query {
    drivers(stage: DRAFT, first: 500) {
      id
      name
      grid
      class
      number
      stream
      deleted
      city
      equipment
      phone
      badgeTitle
      photo { url }
      badge { url }
      team {
        id
        name
        color { hex }
        photo { url }
      }
    }
  }
`;

export function ImportDriversFromHygraph() {
	const [log, setLog] = useState<string[]>([]);
	const [running, setRunning] = useState(false);
	const [done, setDone] = useState(false);

	const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

	const run = async () => {
		setRunning(true);
		setLog([]);
		setDone(false);

		try {
			appendLog("Buscando pilotos no Hygraph...");

			const res = await fetch(import.meta.env.VITE_API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${import.meta.env.VITE_API_PUBLIC_TOKEN}`,
				},
				body: JSON.stringify({ query: HYGRAPH_QUERY }),
			});

			const json = await res.json();
			const drivers = json?.data?.drivers;

			if (!drivers || !Array.isArray(drivers)) {
				appendLog(`❌ Resposta inesperada do Hygraph: ${JSON.stringify(json)}`);
				return;
			}

			appendLog(`${drivers.length} pilotos encontrados. Salvando no Firebase...`);

			for (const driver of drivers) {
				const docData: Record<string, any> = {
					name: driver.name ?? "",
					grid: driver.grid ?? null,
					class: driver.class ?? null,
					number: driver.number ?? null,
					stream: driver.stream ?? null,
					deleted: driver.deleted ?? false,
					photoUrl: driver.photo?.url ?? null,
					badgeTitle: driver.badgeTitle ?? null,
					badgeUrl: driver.badge?.url ?? null,
					city: driver.city ?? null,
					equipment: driver.equipment ?? null,
					phone: driver.phone ?? null,
					teamHygraphId: driver.team?.id ?? null,
					teamName: driver.team?.name ?? null,
					teamColor: driver.team?.color?.hex ?? null,
					teamLogoUrl: driver.team?.photo?.url ?? null,
				};

				await setDoc(doc(db, "drivers", driver.id), docData, { merge: true });
				appendLog(`✓ ${driver.name}${driver.deleted ? " (deletado)" : ""}`);
			}

			appendLog("\n✅ Migração concluída!");
			setDone(true);
		} catch (e: any) {
			appendLog(`❌ Erro: ${e.message}`);
		} finally {
			setRunning(false);
		}
	};

	return (
		<div>
			<h3 className="font-bold text-xl mb-2">
				Importar Pilotos do Hygraph → Firebase (One-Time)
			</h3>
			<p className="text-sm text-f1-lighterCarbon mb-4">
				Copia todos os pilotos do Hygraph para o Firebase. Use merge, então
				campos extras já salvos (gameId, etc.) serão preservados. Execute
				apenas uma vez.
			</p>
			<button
				onClick={run}
				disabled={running || done}
				className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
			>
				{running
					? "Importando..."
					: done
						? "Concluído ✓"
						: "Executar Importação"}
			</button>
			{log.length > 0 && (
				<pre className="mt-4 bg-f1-carbon text-white text-xs p-4 rounded-lg overflow-auto max-h-[500px] whitespace-pre-wrap">
					{log.join("\n")}
				</pre>
			)}
		</div>
	);
}
