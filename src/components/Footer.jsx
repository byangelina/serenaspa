function Footer() {
  const linkStyle = {
    display: "block", fontSize: "0.82rem", fontWeight: 300,
    color: "rgba(250,250,247,0.45)", textDecoration: "none", marginBottom: "0.6rem"
  }

  return (
    <footer style={{ background: "#2a2a2a", padding: "3rem 6% 2rem" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
        gap: "3rem", marginBottom: "3rem"
      }}>
        <div>
          <div style={{
            fontFamily: "var(--display)", fontSize: "1.5rem",
            fontWeight: 300, color: "var(--verde)", marginBottom: "0.8rem"
          }}>
            Serena Spa
          </div>
          <p style={{
            fontSize: "0.82rem", fontWeight: 300,
            color: "rgba(250,250,247,0.4)", lineHeight: 1.7, maxWidth: "240px"
          }}>
            Un espacio de bienestar femenino en Santiago. Porque cuidarte es un acto de amor propio.
          </p>
        </div>

        <div>
          <div style={{
            fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--verde)", marginBottom: "1rem"
          }}>
            Servicios
          </div>
          {["Manicura", "Masajes", "Peluquería", "Faciales"].map(s => (
            <a key={s} href="#servicios" style={linkStyle}>{s}</a>
          ))}
        </div>

        <div>
          <div style={{
            fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--verde)", marginBottom: "1rem"
          }}>
            Spa
          </div>
          {["Nuestra misión", "Galería", "FAQ", "Reservar hora"].map(s => (
            <a key={s} href="#nosotras" style={linkStyle}>{s}</a>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: "0.72rem", color: "rgba(250,250,247,0.25)" }}>
          © 2025 Serena Spa · Santiago, Chile
        </span>
      </div>
    </footer>
  )
}

export default Footer
