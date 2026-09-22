const esc = (v: string | null | undefined) => {
    const s = v ?? "";
    return s.includes(",") || s.includes('"') || s.includes("\n")
        ? `"${s.replace(/"/g, '""')}"`
        : s;
};

export interface ExportableDriver {
    name: string;
    number: string | null;
    gameId: string | null;
    birthDate: string | null;
    nationality: string | null;
    realLifeTeamName: string | null;
    stream: string | null;
    city: string | null;
    equipment: string | null;
}

export function exportDriversCSV(drivers: ExportableDriver[], filename: string) {
    const headers = ["Nome", "Número", "ID", "Data de Nascimento", "Nacionalidade", "Equipe Real", "Stream URL", "Cidade", "Equipamento"];
    const rows = drivers.map((d) =>
        [d.name, d.number, d.gameId, d.birthDate, d.nationality, d.realLifeTeamName, d.stream, d.city, d.equipment]
            .map(esc)
            .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
