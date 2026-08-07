import { useState, useRef, useEffect, useCallback } from "react";
import { useCalendars } from "../../contexts/CalendarsContext";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { useTracks } from "../../contexts/TracksContext";
import { getGridLabel } from "../../shared/config/grids";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";

const FLAGS = {
  Brasil: "🇧🇷", Portugal: "🇵🇹", Argentina: "🇦🇷", EUA: "🇺🇸",
  Reino_Unido: "🇬🇧", Alemanha: "🇩🇪", Espanha: "🇪🇸", França: "🇫🇷",
  Itália: "🇮🇹", Holanda: "🇳🇱", Japão: "🇯🇵", México: "🇲🇽",
  Austrália: "🇦🇺", Canadá: "🇨🇦", Finlândia: "🇫🇮", Mônaco: "🇲🇨",
};

export default function WinnerCardGenerator() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [photoImg, setPhotoImg] = useState(null);

  const { allCalendars } = useCalendars();
  const { drivers: driversData } = useFirebaseDrivers();
  const { isInGrid, applyProfile } = useDriverProfiles();
  const { getTrack } = useTracks();
  const { name: configTenantName } = useTenantConfig();

  const [selectedCalendarId, setSelectedCalendarId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [raceResults, setRaceResults] = useState(null);

  const [form, setForm] = useState({
    cardType: "WINNER",
    driverName: "",
    country: "Brasil",
    teamName: "",
    teamColor: "#DC0000",
    gp: "",
    gridLabel: "",
    season: "",
    startPos: "",
    gap: "",
    bestLap: "",
    points: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── Derived ───────────────────────────────────────────────────────────────

  const selectedCalendar = allCalendars.find(c => c.id === selectedCalendarId) ?? null;
  const calendarGrid = selectedCalendar?.grid ?? "";

  const tenantName = (configTenantName || "TOP SPRINT").toUpperCase();
  const primaryColor = typeof document !== "undefined"
    ? (getComputedStyle(document.documentElement).getPropertyValue("--color-brand-primary").trim() || "#DC0000")
    : "#DC0000";

  const gridDrivers = driversData
    .filter(d => !d.deleted && (calendarGrid ? isInGrid(d.id, calendarGrid) : true))
    .map(d => {
      const applied = calendarGrid ? applyProfile(d, calendarGrid) : d;
      return {
        id: d.id,
        name: applied.name ?? d.name ?? "",
        teamName: applied.team?.name ?? applied.teamName ?? "",
        teamColor: applied.team?.color?.hex ?? applied.teamColor ?? "#DC0000",
        photoUrl: applied.photo?.url ?? (typeof applied.photo === "string" ? applied.photo : ""),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const sortedCalendars = [...allCalendars].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!selectedCalendarId) { setRaceResults(null); return; }
    getDoc(doc(db, "race_results", selectedCalendarId))
      .then(snap => setRaceResults(snap.exists() ? snap.data() : null))
      .catch(() => setRaceResults(null));
  }, [selectedCalendarId]);

  useEffect(() => {
    if (!selectedCalendar) return;
    const track = getTrack(selectedCalendar.trackId);
    const gridLbl = getGridLabel(selectedCalendar.grid) ?? selectedCalendar.grid ?? "";
    const round = selectedCalendar.round ?? "";
    setForm(f => ({
      ...f,
      gp: track?.name ?? round,
      gridLabel: `${gridLbl} · ${round}`,
    }));
    setSelectedDriverId("");
    setPhotoImg(null);
  }, [selectedCalendarId]);

  useEffect(() => {
    if (!selectedDriverId) return;
    const driver = gridDrivers.find(d => d.id === selectedDriverId);
    if (!driver) return;

    const updates = {
      driverName: driver.name,
      teamName: driver.teamName,
      teamColor: driver.teamColor,
    };

    if (raceResults) {
      const qualiIdx = (raceResults.resultsQualy ?? []).indexOf(selectedDriverId);
      const raceIdx = (raceResults.results ?? []).indexOf(selectedDriverId);
      if (qualiIdx !== -1) updates.startPos = `${qualiIdx + 1}º`;
      if (raceIdx !== -1) updates.points = `${raceIdx + 1}º`;
    }

    setForm(f => ({ ...f, ...updates }));

    if (driver.photoUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setPhotoImg(img);
      img.onerror = () => setPhotoImg(null);
      img.src = driver.photoUrl;
    } else {
      setPhotoImg(null);
    }
  }, [selectedDriverId, raceResults]);

  useEffect(() => {
    if (generated) drawCard();
  }, [generated, form, photoImg]);

  // ── Photo upload override ─────────────────────────────────────────────────

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setPhotoImg(img);
    img.src = url;
  };

  // ── Canvas ────────────────────────────────────────────────────────────────

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 800, H = 900;
    canvas.width = W;
    canvas.height = H;

    const teamColor = form.teamColor || primaryColor;

    // BACKGROUND
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0a0000");
    bgGrad.addColorStop(0.4, "#1a0000");
    bgGrad.addColorStop(1, "#000000");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Glow
    const glow = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, 450);
    glow.addColorStop(0, teamColor + "55");
    glow.addColorStop(0.5, teamColor + "22");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Diagonal stripes
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 40;
    for (let i = -H; i < W + H; i += 90) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
    ctx.restore();

    // Watermark
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 90px 'Arial Black', Arial";
    ctx.textAlign = "center";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 3; col++) {
        ctx.fillText(form.cardType, col * 320 - 40, 80 + row * 100);
      }
    }
    ctx.restore();

    // Corner brackets
    ctx.save();
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.9;
    const bS = 30;
    ctx.beginPath(); ctx.moveTo(16, 16 + bS); ctx.lineTo(16, 16); ctx.lineTo(16 + bS, 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 16 - bS, 16); ctx.lineTo(W - 16, 16); ctx.lineTo(W - 16, 16 + bS); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16, 660 - bS); ctx.lineTo(16, 660); ctx.lineTo(16 + bS, 660); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 16 - bS, 660); ctx.lineTo(W - 16, 660); ctx.lineTo(W - 16, 660 - bS); ctx.stroke();
    ctx.restore();

    // Top season banner
    const bannerGrad = ctx.createLinearGradient(0, 0, W, 0);
    bannerGrad.addColorStop(0, teamColor + "cc");
    bannerGrad.addColorStop(0.5, teamColor);
    bannerGrad.addColorStop(1, teamColor + "cc");
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, 0, W, 36);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Arial', sans-serif";
    ctx.textAlign = "center";
    const seasonLabel = form.season ? `${form.season.toUpperCase()}` : "";
    const bannerText = [
      `${tenantName}${seasonLabel ? " · " + seasonLabel : ""}`,
      `${tenantName}${seasonLabel ? " · " + seasonLabel : ""}`,
      `${tenantName}${seasonLabel ? " · " + seasonLabel : ""}`,
    ].join("  •  ");
    ctx.fillText(bannerText, W / 2, 23);

    // Photo
    if (photoImg) {
      const photoArea = { x: 0, y: 36, w: W, h: 624 };
      const imgAspect = photoImg.width / photoImg.height;
      const areaAspect = photoArea.w / photoArea.h;
      let drawW, drawH, drawX, drawY;
      if (imgAspect > areaAspect) {
        drawH = photoArea.h; drawW = drawH * imgAspect;
        drawX = photoArea.x + (photoArea.w - drawW) / 2; drawY = photoArea.y;
      } else {
        drawW = photoArea.w; drawH = drawW / imgAspect;
        drawX = photoArea.x; drawY = photoArea.y + (photoArea.h - drawH) / 2;
      }
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoArea.x, photoArea.y, photoArea.w, photoArea.h);
      ctx.clip();
      ctx.drawImage(photoImg, drawX, drawY, drawW, drawH);
      ctx.restore();

      const fadeGrad = ctx.createLinearGradient(0, 500, 0, 660);
      fadeGrad.addColorStop(0, "transparent");
      fadeGrad.addColorStop(1, "#000000ee");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 400, W, 260);

      const leftFade = ctx.createLinearGradient(0, 0, 180, 0);
      leftFade.addColorStop(0, "#000000cc");
      leftFade.addColorStop(1, "transparent");
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 36, 180, 624);
    } else {
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      ctx.font = "140px Arial";
      ctx.textAlign = "center";
      ctx.fillText("👤", W / 2, 400);
      ctx.globalAlpha = 0.3;
      ctx.font = "18px Arial";
      ctx.fillText("Selecione um piloto ou faça upload da foto", W / 2, 500);
      ctx.restore();
    }

    // Flag
    const flagEmoji = FLAGS[form.country] || "🏁";
    ctx.font = "28px serif";
    ctx.textAlign = "left";
    ctx.fillText(flagEmoji, 30, 570);

    // Driver name
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 12;
    const nameParts = (form.driverName || "PILOTO").toUpperCase().split(" ");
    if (nameParts.length >= 2) {
      const firstName = nameParts.slice(0, -1).join(" ");
      const lastName = nameParts[nameParts.length - 1];
      ctx.font = "bold 36px 'Arial Black', Arial";
      ctx.textAlign = "left";
      ctx.fillText(firstName, 30, 600);
      ctx.font = "bold 52px 'Arial Black', Arial";
      ctx.fillText(lastName, 30, 650);
    } else {
      ctx.font = "bold 48px 'Arial Black', Arial";
      ctx.textAlign = "left";
      ctx.fillText(form.driverName.toUpperCase() || "PILOTO", 30, 635);
    }

    // Team name
    ctx.fillStyle = teamColor;
    ctx.font = "bold 18px 'Arial', sans-serif";
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.fillText((form.teamName || "").toUpperCase(), 32, 672);
    ctx.shadowBlur = 0;

    // Big card type text
    ctx.save();
    ctx.textAlign = "center";
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 3;
    ctx.font = "bold 110px 'Arial Black', Arial";
    ctx.shadowColor = teamColor;
    ctx.shadowBlur = 30;
    ctx.strokeText(form.cardType, W / 2 + 60, 660);
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 0;
    ctx.fillText(form.cardType, W / 2 + 60, 660);
    ctx.restore();

    // GP info bar
    const gpBarY = 672, gpBarH = 52;
    const gpGrad = ctx.createLinearGradient(0, gpBarY, W, gpBarY);
    gpGrad.addColorStop(0, teamColor + "dd");
    gpGrad.addColorStop(0.6, teamColor + "aa");
    gpGrad.addColorStop(1, "#00000000");
    ctx.fillStyle = gpGrad;
    ctx.fillRect(0, gpBarY, W, gpBarH);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Arial Black', Arial";
    ctx.textAlign = "center";
    ctx.fillText((form.gp || "").toUpperCase(), W / 2, gpBarY + 22);
    ctx.font = "12px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText((form.gridLabel || "").toUpperCase(), W / 2, gpBarY + 40);

    // Stats bar
    const statsY = 724, statsH = 100;
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(0, statsY, W, statsH);
    ctx.fillStyle = teamColor;
    ctx.fillRect(0, statsY, W, 2);

    const stats = [
      { label: "POS. LARGADA", value: form.startPos || "—" },
      { label: "DIFERENÇA",    value: form.gap      || "—" },
      { label: "MELHOR VOLTA", value: form.bestLap  || "—" },
      { label: "PONTOS",       value: form.points   || "—" },
    ];
    const colW = W / 4;
    stats.forEach((s, i) => {
      const cx = colW * i + colW / 2;
      if (i > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(colW * i, statsY + 10, 1, statsH - 20);
      }
      ctx.font = "9px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "center";
      ctx.fillText(s.label, cx, statsY + 34);
      ctx.font = "bold 22px 'Arial Black', Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(s.value, cx, statsY + 62);
    });

    // Bottom logo bar
    const logoBarY = statsY + statsH;
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, logoBarY, W, H - logoBarY);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 20px 'Arial Black', Arial";
    ctx.textAlign = "center";
    ctx.fillText(tenantName, W / 2, logoBarY + 32);
    ctx.fillStyle = teamColor;
    ctx.fillRect(0, H - 4, W, 4);

  }, [form, photoImg, primaryColor, tenantName]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerated(true);
      setGenerating(false);
      setTimeout(() => drawCard(), 50);
    }, 300);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `card-${(form.driverName || "piloto").replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ── Styles ────────────────────────────────────────────────────────────────

  const inputStyle = {
    background: "#1a1a1a", border: "1px solid #333", borderRadius: 6,
    color: "#fff", padding: "8px 12px", fontSize: 14, width: "100%",
    outline: "none", fontFamily: "inherit",
  };
  const labelStyle = {
    fontSize: 10, color: "#888", textTransform: "uppercase",
    letterSpacing: "0.1em", marginBottom: 4, display: "block",
  };
  const divider = <div style={{ height: 1, background: "#222", margin: "16px 0" }} />;
  const field = (label, children) => (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#111", borderBottom: `2px solid ${primaryColor}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.05em", color: primaryColor }}>{tenantName}</span>
        <span style={{ color: "#666", fontSize: 14 }}>|</span>
        <span style={{ fontSize: 14, color: "#ccc", fontWeight: 600 }}>Card Generator</span>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 0, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 300, minWidth: 300, background: "#111", borderRight: "1px solid #222", padding: 20, overflowY: "auto" }}>
          <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20, fontWeight: 700 }}>Configurações</div>

          {field("Tipo de Card",
            <select style={inputStyle} value={form.cardType} onChange={e => set("cardType", e.target.value)}>
              {["WINNER", "POLE", "PODIUM", "DNF", "FASTEST LAP"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}

          {divider}

          {/* Calendar */}
          {field("Etapa",
            <select style={inputStyle} value={selectedCalendarId} onChange={e => setSelectedCalendarId(e.target.value)}>
              <option value="">Selecionar etapa...</option>
              {sortedCalendars.map(c => {
                const track = getTrack(c.trackId);
                const label = `${track?.name ?? c.round} · ${getGridLabel(c.grid) ?? c.grid}`;
                return <option key={c.id} value={c.id}>{label}</option>;
              })}
            </select>
          )}

          {/* Driver */}
          {field("Piloto",
            <select style={inputStyle} value={selectedDriverId} onChange={e => setSelectedDriverId(e.target.value)} disabled={!selectedCalendarId}>
              <option value="">Selecionar piloto...</option>
              {gridDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          )}

          {/* Photo override */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Foto (override manual)</label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, background: "#1a1a1a", border: "1px dashed #444", borderRadius: 6, padding: "10px 12px", cursor: "pointer", fontSize: 13, color: photoImg ? "#4ade80" : "#888" }}>
              <span>{photoImg ? "✓ Foto carregada" : "📁 Upload manual"}</span>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>

          {divider}

          {field("Nome do Piloto",
            <input style={inputStyle} value={form.driverName} onChange={e => set("driverName", e.target.value)} placeholder="Auto-preenchido pelo piloto" />
          )}

          {field("Equipe",
            <input style={inputStyle} value={form.teamName} onChange={e => set("teamName", e.target.value)} placeholder="Auto-preenchido pelo piloto" />
          )}

          {field("Cor da Equipe",
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="color" value={form.teamColor} onChange={e => set("teamColor", e.target.value)} style={{ width: 36, height: 36, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
              <input style={{ ...inputStyle, flex: 1 }} value={form.teamColor} onChange={e => set("teamColor", e.target.value)} />
            </div>
          )}

          {field("País",
            <select style={inputStyle} value={form.country} onChange={e => set("country", e.target.value)}>
              {Object.keys(FLAGS).map(c => <option key={c} value={c}>{FLAGS[c]} {c.replace("_", " ")}</option>)}
            </select>
          )}

          {divider}

          {field("Grande Prêmio",
            <input style={inputStyle} value={form.gp} onChange={e => set("gp", e.target.value)} placeholder="Auto-preenchido pela etapa" />
          )}

          {field("Grid / Etapa",
            <input style={inputStyle} value={form.gridLabel} onChange={e => set("gridLabel", e.target.value)} placeholder="Auto-preenchido pela etapa" />
          )}

          {field("Temporada",
            <input style={inputStyle} value={form.season} onChange={e => set("season", e.target.value)} placeholder="Ex: Temporada 2" />
          )}

          {divider}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Pos. Largada", "startPos"],
              ["Diferença",   "gap"],
              ["Melhor Volta","bestLap"],
              ["Pontos",      "points"],
            ].map(([label, key]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input style={inputStyle} value={form[key]} onChange={e => set(key, e.target.value)} placeholder="—" />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={handleGenerate} disabled={generating} style={{ background: generating ? "#333" : primaryColor, color: "#fff", border: "none", borderRadius: 6, padding: "12px 0", fontWeight: 800, fontSize: 14, cursor: generating ? "not-allowed" : "pointer", letterSpacing: "0.05em" }}>
              {generating ? "Gerando..." : "⚡ Gerar Card"}
            </button>
            {generated && (
              <button onClick={handleDownload} style={{ background: "transparent", color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 6, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                ⬇ Baixar PNG
              </button>
            )}
          </div>
        </div>

        {/* Canvas preview */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, background: "#0d0d0d", overflow: "auto" }}>
          {!generated ? (
            <div style={{ textAlign: "center", color: "#333", userSelect: "none" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏁</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Configure o card e clique em Gerar</div>
              <div style={{ fontSize: 12, marginTop: 8, color: "#2a2a2a" }}>O preview aparecerá aqui</div>
            </div>
          ) : null}
          <canvas ref={canvasRef} style={{ display: generated ? "block" : "none", maxWidth: "100%", maxHeight: "80vh", borderRadius: 8, boxShadow: `0 0 60px ${primaryColor}44, 0 0 0 1px #222` }} />
        </div>
      </div>
    </div>
  );
}
