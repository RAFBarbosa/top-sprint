import { useState, useRef, useEffect, useCallback } from "react";

const TEAMS = ["Ferrari", "Red Bull", "Mercedes", "McLaren", "Alpine", "Aston Martin", "Williams", "AlphaTauri", "Alfa Romeo", "Haas"];
const TEAM_COLORS = {
  Ferrari: "#DC0000",
  "Red Bull": "#3671C6",
  Mercedes: "#00D2BE",
  McLaren: "#FF8000",
  Alpine: "#0093CC",
  "Aston Martin": "#358C75",
  Williams: "#005AFF",
  AlphaTauri: "#2B4562",
  "Alfa Romeo": "#900000",
  Haas: "#B6BABD",
};

const FLAGS = {
  Brasil: "🇧🇷", Portugal: "🇵🇹", Argentina: "🇦🇷", EUA: "🇺🇸",
  Reino_Unido: "🇬🇧", Alemanha: "🇩🇪", Espanha: "🇪🇸", França: "🇫🇷",
  Itália: "🇮🇹", Holanda: "🇳🇱", Japão: "🇯🇵", México: "🇲🇽",
  Austrália: "🇦🇺", Canadá: "🇨🇦", Finlândia: "🇫🇮", Mônaco: "🇲🇨",
};

export default function App() {
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoImg, setPhotoImg] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [form, setForm] = useState({
    driverName: "Felipe Sousa",
    team: "Ferrari",
    country: "Brasil",
    gp: "Grande Prêmio de Miami",
    grid: "Grid C1 - Etapa 03",
    startPos: "1º",
    gap: "-17.669",
    bestLap: "1:28.021",
    points: "+26",
    season: "Temporada 2",
    cardType: "WINNER",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    const img = new Image();
    img.onload = () => setPhotoImg(img);
    img.src = url;
  };

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 800, H = 900;
    canvas.width = W;
    canvas.height = H;

    const teamColor = TEAM_COLORS[form.team] || "#DC0000";

    // === BACKGROUND ===
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0a0000");
    bgGrad.addColorStop(0.4, "#1a0000");
    bgGrad.addColorStop(1, "#000000");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Red glow top-right
    const glow = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, 450);
    glow.addColorStop(0, teamColor + "55");
    glow.addColorStop(0.5, teamColor + "22");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // === DIAGONAL STRIPES ===
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

    // === WATERMARK TEXT (WINNER repeating) ===
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 90px 'Arial Black', Arial";
    ctx.textAlign = "center";
    const label = form.cardType;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 3; col++) {
        ctx.fillText(label, col * 320 - 40, 80 + row * 100);
      }
    }
    ctx.restore();

    // === CORNER BRACKET TOP-LEFT ===
    ctx.save();
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.9;
    const bS = 30;
    // TL
    ctx.beginPath(); ctx.moveTo(16, 16 + bS); ctx.lineTo(16, 16); ctx.lineTo(16 + bS, 16); ctx.stroke();
    // TR
    ctx.beginPath(); ctx.moveTo(W - 16 - bS, 16); ctx.lineTo(W - 16, 16); ctx.lineTo(W - 16, 16 + bS); ctx.stroke();
    // BL (above stats area)
    ctx.beginPath(); ctx.moveTo(16, 660 - bS); ctx.lineTo(16, 660); ctx.lineTo(16 + bS, 660); ctx.stroke();
    // BR
    ctx.beginPath(); ctx.moveTo(W - 16 - bS, 660); ctx.lineTo(W - 16, 660); ctx.lineTo(W - 16, 660 - bS); ctx.stroke();
    ctx.restore();

    // === TOP SEASON BANNER ===
    const bannerGrad = ctx.createLinearGradient(0, 0, W, 0);
    bannerGrad.addColorStop(0, teamColor + "cc");
    bannerGrad.addColorStop(0.5, teamColor);
    bannerGrad.addColorStop(1, teamColor + "cc");
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, 0, W, 36);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Arial', sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "6px";
    // Repeat season text
    const seasonText = `CRT CUP ${form.season.toUpperCase()}  •  CRT CUP ${form.season.toUpperCase()}  •  CRT CUP ${form.season.toUpperCase()}`;
    ctx.fillText(seasonText, W / 2, 23);

    // === PHOTO ===
    if (photoImg) {
      // Photo area: centered, from y=36 to y=660
      const photoArea = { x: 0, y: 36, w: W, h: 624 };
      const imgAspect = photoImg.width / photoImg.height;
      const areaAspect = photoArea.w / photoArea.h;

      let drawW, drawH, drawX, drawY;
      if (imgAspect > areaAspect) {
        drawH = photoArea.h;
        drawW = drawH * imgAspect;
        drawX = photoArea.x + (photoArea.w - drawW) / 2;
        drawY = photoArea.y;
      } else {
        drawW = photoArea.w;
        drawH = drawW / imgAspect;
        drawX = photoArea.x;
        drawY = photoArea.y + (photoArea.h - drawH) / 2;
      }

      // Bottom gradient fade over photo
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoArea.x, photoArea.y, photoArea.w, photoArea.h);
      ctx.clip();
      ctx.drawImage(photoImg, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Fade bottom of photo into dark
      const fadeGrad = ctx.createLinearGradient(0, 500, 0, 660);
      fadeGrad.addColorStop(0, "transparent");
      fadeGrad.addColorStop(1, "#000000ee");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 400, W, 260);

      // Left fade
      const leftFade = ctx.createLinearGradient(0, 0, 180, 0);
      leftFade.addColorStop(0, "#000000cc");
      leftFade.addColorStop(1, "transparent");
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 36, 180, 624);
    } else {
      // Placeholder silhouette
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      ctx.font = "140px Arial";
      ctx.textAlign = "center";
      ctx.fillText("👤", W / 2, 400);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Arial";
      ctx.fillText("Faça upload da foto do piloto (PNG transparente)", W / 2, 500);
      ctx.restore();
    }

    // === DRIVER INFO (bottom-left overlay) ===
    // Country flag emoji
    const flagEmoji = FLAGS[form.country] || "🏁";
    ctx.font = "28px serif";
    ctx.textAlign = "left";
    ctx.fillText(flagEmoji, 30, 570);

    // Driver name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px 'Arial Black', Arial";
    ctx.textAlign = "left";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 12;

    const nameParts = form.driverName.toUpperCase().split(" ");
    if (nameParts.length >= 2) {
      const firstName = nameParts.slice(0, -1).join(" ");
      const lastName = nameParts[nameParts.length - 1];
      ctx.font = "bold 36px 'Arial Black', Arial";
      ctx.fillText(firstName, 30, 600);
      ctx.font = "bold 52px 'Arial Black', Arial";
      ctx.fillText(lastName, 30, 650);
    } else {
      ctx.font = "bold 48px 'Arial Black', Arial";
      ctx.fillText(form.driverName.toUpperCase(), 30, 635);
    }

    // Team name in red
    ctx.fillStyle = teamColor;
    ctx.font = "bold 18px 'Arial', sans-serif";
    ctx.shadowBlur = 0;
    ctx.fillText(form.team.toUpperCase(), 32, 672);

    ctx.shadowBlur = 0;

    // === BIG WINNER TEXT ===
    ctx.save();
    ctx.textAlign = "center";
    // Stroke outline
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

    // === GP INFO BAR ===
    const gpBarY = 672;
    const gpBarH = 52;

    const gpGrad = ctx.createLinearGradient(0, gpBarY, W, gpBarY);
    gpGrad.addColorStop(0, teamColor + "dd");
    gpGrad.addColorStop(0.6, teamColor + "aa");
    gpGrad.addColorStop(1, "#00000000");
    ctx.fillStyle = gpGrad;
    ctx.fillRect(0, gpBarY, W, gpBarH);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Arial Black', Arial";
    ctx.textAlign = "center";
    ctx.fillText(form.gp.toUpperCase(), W / 2, gpBarY + 22);
    ctx.font = "12px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(form.grid.toUpperCase(), W / 2, gpBarY + 40);

    // === STATS BAR ===
    const statsY = 724;
    const statsH = 100;

    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(0, statsY, W, statsH);

    // Top accent line
    ctx.fillStyle = teamColor;
    ctx.fillRect(0, statsY, W, 2);

    // 4 stat columns
    const stats = [
      { icon: "⊞", label: "POSIÇÃO LARGADA", value: form.startPos },
      { icon: "⚑", label: "DIFERENÇA", value: form.gap },
      { icon: "⏱", label: "MELHOR VOLTA", value: form.bestLap },
      { icon: "🏆", label: "PONTOS", value: form.points },
    ];

    const colW = W / 4;
    stats.forEach((s, i) => {
      const cx = colW * i + colW / 2;

      // Divider
      if (i > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(colW * i, statsY + 10, 1, statsH - 20);
      }

      // Icon
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.fillStyle = teamColor;
      ctx.fillText(s.icon, cx, statsY + 28);

      // Label
      ctx.font = "9px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(s.label, cx, statsY + 46);

      // Value
      ctx.font = "bold 22px 'Arial Black', Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(s.value, cx, statsY + 74);
    });

    // === BOTTOM LOGO BAR ===
    const logoBarY = statsY + statsH;
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, logoBarY, W, H - logoBarY);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Arial Black', Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("CRT", W / 2, logoBarY + 32);

    // Bottom line
    ctx.fillStyle = teamColor;
    ctx.fillRect(0, H - 4, W, 4);

  }, [form, photoImg]);

  useEffect(() => {
    if (generated) drawCard();
  }, [generated, drawCard]);

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
    link.download = `winner-card-${form.driverName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const inputStyle = {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 6,
    color: "#fff",
    padding: "8px 12px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle = {
    fontSize: 10,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 4,
    display: "block",
  };

  const fieldGroup = (label, children) => (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "#111",
        borderBottom: "2px solid #DC0000",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.05em", color: "#DC0000" }}>CRT</span>
        <span style={{ color: "#666", fontSize: 14 }}>|</span>
        <span style={{ fontSize: 14, color: "#ccc", fontWeight: 600 }}>Card Generator</span>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 0 }}>
        {/* Sidebar */}
        <div style={{
          width: 300,
          minWidth: 300,
          background: "#111",
          borderRight: "1px solid #222",
          padding: 20,
          overflowY: "auto",
        }}>
          <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20, fontWeight: 700 }}>
            Configurações
          </div>

          {/* Card Type */}
          {fieldGroup("Tipo de Card",
            <select style={inputStyle} value={form.cardType} onChange={e => set("cardType", e.target.value)}>
              {["WINNER", "POLE", "PODIUM", "DNF", "FASTEST LAP"].map(t =>
                <option key={t} value={t}>{t}</option>
              )}
            </select>
          )}

          {/* Photo upload */}
          {fieldGroup("Foto do Piloto (PNG transparente)",
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#1a1a1a",
              border: "1px dashed #444",
              borderRadius: 6,
              padding: "10px 12px",
              cursor: "pointer",
              fontSize: 13,
              color: photo ? "#4ade80" : "#888",
            }}>
              <span>{photo ? "✓ Foto carregada" : "📁 Selecionar imagem"}</span>
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
            </label>
          )}

          <div style={{ height: 1, background: "#222", margin: "16px 0" }} />

          {fieldGroup("Nome do Piloto",
            <input style={inputStyle} value={form.driverName} onChange={e => set("driverName", e.target.value)} />
          )}

          {fieldGroup("Equipe",
            <select style={inputStyle} value={form.team} onChange={e => set("team", e.target.value)}>
              {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}

          {fieldGroup("País",
            <select style={inputStyle} value={form.country} onChange={e => set("country", e.target.value)}>
              {Object.keys(FLAGS).map(c => <option key={c} value={c}>{FLAGS[c]} {c.replace("_", " ")}</option>)}
            </select>
          )}

          <div style={{ height: 1, background: "#222", margin: "16px 0" }} />

          {fieldGroup("Grande Prêmio",
            <input style={inputStyle} value={form.gp} onChange={e => set("gp", e.target.value)} />
          )}

          {fieldGroup("Grid / Etapa",
            <input style={inputStyle} value={form.grid} onChange={e => set("grid", e.target.value)} />
          )}

          {fieldGroup("Temporada",
            <input style={inputStyle} value={form.season} onChange={e => set("season", e.target.value)} />
          )}

          <div style={{ height: 1, background: "#222", margin: "16px 0" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={labelStyle}>Pos. Largada</label>
              <input style={inputStyle} value={form.startPos} onChange={e => set("startPos", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Diferença</label>
              <input style={inputStyle} value={form.gap} onChange={e => set("gap", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Melhor Volta</label>
              <input style={inputStyle} value={form.bestLap} onChange={e => set("bestLap", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Pontos</label>
              <input style={inputStyle} value={form.points} onChange={e => set("points", e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={handleGenerate}
              disabled={generating}
              style={{
                background: generating ? "#333" : "#DC0000",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 0",
                fontWeight: 800,
                fontSize: 14,
                cursor: generating ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
                transition: "background 0.2s",
              }}
            >
              {generating ? "Gerando..." : "⚡ Gerar Card"}
            </button>

            {generated && (
              <button
                onClick={handleDownload}
                style={{
                  background: "transparent",
                  color: "#DC0000",
                  border: "1px solid #DC0000",
                  borderRadius: 6,
                  padding: "10px 0",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                ⬇ Baixar PNG
              </button>
            )}
          </div>
        </div>

        {/* Canvas Preview */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          background: "#0d0d0d",
          position: "relative",
        }}>
          {!generated ? (
            <div style={{
              textAlign: "center",
              color: "#333",
              userSelect: "none",
            }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏁</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Configure o card e clique em Gerar</div>
              <div style={{ fontSize: 12, marginTop: 8, color: "#2a2a2a" }}>O preview aparecerá aqui</div>
            </div>
          ) : null}

          <canvas
            ref={canvasRef}
            style={{
              display: generated ? "block" : "none",
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: 8,
              boxShadow: "0 0 60px rgba(220,0,0,0.3), 0 0 0 1px #222",
            }}
          />
        </div>
      </div>
    </div>
  );
}
