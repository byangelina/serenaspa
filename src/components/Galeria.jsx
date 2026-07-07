import { useState } from "react"

// Datos de las 6 imágenes de galería
const ITEMS = [
  { imagen: "img/gal-masajes.jpg",  label: "Sala de masajes",       grande: true  },
  { imagen: "img/gal-faciales.jpg", label: "Tratamientos faciales", grande: false },
  { imagen: "img/gal-manicura.jpg", label: "Manicura",              grande: false },
  { imagen: "img/gal-peluqueria.jpg",label: "Peluquería",           grande: false },
  { imagen: "img/gal-ambiente.jpg", label: "Ambiente Serena",       grande: false },
  { imagen: "img/gal-rituales.jpg", label: "Rituales",              grande: false }
]

// Componente reutilizable para cada celda de galería
function GalItem({ imagen, label, grande }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: grande ? "span 2" : "span 1",
        height: "340px",
        backgroundImage: `url('${imagen}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", overflow: "hidden",
        transform: hover ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s",
        cursor: "default"
      }}
    >
      <span style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0.7rem",
        background: "rgba(0,0,0,0.45)",
        fontSize: "0.72rem", fontWeight: 400,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(250,250,247,0.9)", textAlign: "center",
        opacity: hover ? 1 : 0, transition: "opacity 0.3s"
      }}>
        {label}
      </span>
    </div>
  )
}

function Galeria() {
  return (
    <section id="galeria" style={{ background: "var(--crema)", padding: "6rem 6%" }}>
      <span style={{
        display: "block", fontSize: "0.72rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--cacao)", marginBottom: "0.8rem"
      }}>
        Nuestros espacios
      </span>
      <h2 style={{
        fontFamily: "var(--display)", fontWeight: 300,
        fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--verde-osc)",
        marginBottom: "3rem", lineHeight: 1.15
      }}>
        Un lugar <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>para sentirte</em>
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.8rem"
      }}>
        {ITEMS.map((item, i) => (
          <GalItem key={i} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Galeria
