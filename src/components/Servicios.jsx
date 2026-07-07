import { useState } from "react"

// Datos de los 4 servicios
const SERVICIOS = [
  {
    id: 1,
    titulo: "Manicura",
    subtitulo: "Manos que te representan",
    imagen: "img/manicura.jpg",
    items: [
      "Esmaltado semipermanente",
      "Manicura rusa y Polygel",
      "Nail art personalizado",
      "PediSpa de relajación"
    ]
  },
  {
    id: 2,
    titulo: "Masajes",
    subtitulo: "Suelta lo que cargas",
    imagen: "img/masajes.jpg",
    items: [
      "Masaje relajante cuerpo completo",
      "Descontracturante profundo",
      "Masaje con piedras calientes",
      "Ritual aromaterápico"
    ]
  },
  {
    id: 3,
    titulo: "Peluquería",
    subtitulo: "Tu cabello, tu identidad",
    imagen: "img/peluqueria.jpg",
    items: [
      "Corte y peinado personalizado",
      "Coloración y balayage",
      "Tratamientos de hidratación",
      "Alisados libres de formol"
    ]
  },
  {
    id: 4,
    titulo: "Faciales",
    subtitulo: "Cuida tu piel, cuida tu mente",
    imagen: "img/faciales.jpg",
    items: [
      "Limpieza facial profunda",
      "Hidratación y luminosidad",
      "Tratamiento antiedad",
      "Ritual de relajación facial"
    ]
  }
]

// Componente reutilizable para cada card de servicio
function ServicioCard({ servicio }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", minHeight: "380px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        backgroundImage: `url('${servicio.imagen}')`,
        backgroundSize: "cover", backgroundPosition: "center 30%",
        transform: hover ? "translateY(-6px)" : "none",
        boxShadow: hover ? "0 18px 45px rgba(61,90,71,0.25)" : "none",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        cursor: "default"
      }}
    >
      {/* Overlay degradado que cambia al hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: hover
          ? "linear-gradient(to top, rgba(61,90,71,0.94) 0%, rgba(61,90,71,0.70) 45%, rgba(61,90,71,0.20) 100%)"
          : "linear-gradient(to top, rgba(42,38,34,0.92) 0%, rgba(42,38,34,0.65) 40%, rgba(42,38,34,0.15) 100%)",
        transition: "background 0.4s ease"
      }} />

      {/* Contenido sobre el overlay */}
      <div style={{ position: "relative", zIndex: 2, padding: "2rem 1.8rem", width: "100%" }}>
        <span style={{
          fontFamily: "var(--display)", fontSize: "1.6rem", fontWeight: 400,
          color: "var(--blanco)", display: "block", marginBottom: "0.3rem"
        }}>
          {servicio.titulo}
        </span>
        <p style={{
          fontSize: "0.78rem", fontStyle: "italic",
          color: "var(--rosa)", marginBottom: "1.2rem"
        }}>
          {servicio.subtitulo}
        </p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {servicio.items.map((item, i) => (
            <li key={i} style={{
              fontSize: "0.85rem", fontWeight: 300,
              color: "rgba(250,250,247,0.9)",
              display: "flex", alignItems: "flex-start", gap: "0.5rem"
            }}>
              <span style={{ color: "var(--verde)", flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Servicios() {
  return (
    <section id="servicios" style={{ background: "var(--blanco)", padding: "6rem 6%" }}>
      <span style={{
        display: "block", fontSize: "0.72rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--verde)", marginBottom: "0.8rem"
      }}>
        Lo que ofrecemos
      </span>
      <h2 style={{
        fontFamily: "var(--display)", fontWeight: 300,
        fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--verde-osc)",
        marginBottom: "3.5rem", lineHeight: 1.15
      }}>
        Servicios para tu <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>bienestar</em>
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem"
      }}>
        {SERVICIOS.map(srv => (
          <ServicioCard key={srv.id} servicio={srv} />
        ))}
      </div>
    </section>
  )
}

export default Servicios
