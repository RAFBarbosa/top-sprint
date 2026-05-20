import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/adminClient";

const QUERY = `
  query {
    partners(stage: DRAFT, first: 500) {
      id
      name
      altText
      deleted
      image { url }
      footerLogo { url }
      link
      active
    }
  }
`;

export function ImportPartnersFromHygraph() {
	const [log, setLog] = useState<string[]>([]);
	const [running, setRunning] = useState(false);
	const [done, setDone] = useState(false);

	const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

	const run = async () => {
		setRunning(true);
		setLog([]);
		setDone(false);

		try {
			appendLog("Buscando parceiros no Hygraph...");

			const res = await fetch(import.meta.env.VITE_API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${import.meta.env.VITE_API_PUBLIC_TOKEN}`,
				},
				body: JSON.stringify({ query: QUERY }),
			});

			const json = await res.json();
			const partners = json?.data?.partners;

			if (!partners || !Array.isArray(partners)) {
				appendLog(`❌ Resposta inesperada: ${JSON.stringify(json)}`);
				return;
			}

			appendLog(`${partners.length} parceiros encontrados. Salvando no Firebase...`);

			for (const partner of partners) {
				const docData = {
					name: partner.name ?? "",
					altText: partner.altText ?? null,
					deleted: partner.deleted ?? false,
					imageUrl: partner.image?.url ?? null,
					footerLogoUrl: partner.footerLogo?.url ?? null,
					link: partner.link ?? null,
					active: partner.active ?? true,
				};
				await setDoc(doc(db, "partners", partner.id), docData, { merge: true });
				appendLog(`✓ ${partner.name}${partner.deleted ? " (deletado)" : ""}`);
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
				Importar Parceiros do Hygraph → Firebase (One-Time)
			</h3>
			<p className="text-sm text-f1-lighterCarbon mb-4">
				Copia todos os parceiros do Hygraph para o Firebase. Execute apenas uma vez.
			</p>
			<button
				onClick={run}
				disabled={running || done}
				className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
			>
				{running ? "Importando..." : done ? "Concluído ✓" : "Executar Importação"}
			</button>
			{log.length > 0 && (
				<pre className="mt-4 bg-f1-carbon text-white text-xs p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
					{log.join("\n")}
				</pre>
			)}
		</div>
	);
}
