import { useState, useEffect } from "react"

// Datos de los 3 slides del carrusel
const SLIDES = [
  {
    eyebrow: "Spa · Bienestar Femenino · Santiago",
    titulo: ["Un lugar donde", "tú primero"],
    texto: "Masajes, manicura, peluquería y tratamientos faciales en un espacio creado para tu descanso, tu confianza y tu salud emocional.",
    btn1: { texto: "Reservar hora", href: "#contacto" },
    btn2: { texto: "Ver servicios", href: "#servicios" },
    imagen: "img/hero1.jpg"
  },
  {
    eyebrow: "Salud emocional",
    titulo: ["Cuidar tu mente", "también es belleza"],
    texto: "Más que un spa: un espacio de contención y escucha. Acompañamos tu bienestar psicológico con un trato cálido, humano y sin juicios.",
    btn1: { texto: "Conoce nuestra misión", href: "#nosotras" },
    btn2: { texto: "Ver servicios", href: "#servicios" },
    imagen: "img/hero2.jpg"
  },
  {
    eyebrow: "Test gratuito",
    titulo: ["Conoce tu nivel", "de bienestar"],
    texto: "Agenda una evaluación gratuita de bienestar emocional con nuestras profesionales. Sin costo, sin compromiso: solo un primer paso para cuidarte.",
    btn1: { texto: "Solicitar test gratis", href: "#contacto" },
    btn2: { texto: "Más información", href: "#faq" },
    imagen: "img/hero3.jpg"
  }
]

function Hero() {
  // Estado del slide actual
  const [slideActual, setSlideActual] = useState(0)

  // Avance automático cada 6 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual(prev => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(intervalo)
  }, [])

  const irA = (n) => {
    setSlideActual((n + SLIDES.length) % SLIDES.length)
  }

  const slide = SLIDES[slideActual]

  return (
    <section id="inicio" style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      backgroundImage: `url('${slide.imagen}')`,
      backgroundSize: "cover", backgroundPosition: "center",
      transition: "background-image 0.8s ease"
    }}>
      {/* Overlay translúcido con paleta del spa */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(232,240,230,0.84) 0%, rgba(245,237,230,0.80) 55%, rgba(242,212,208,0.82) 100%)"
      }} />

      {/* Contenido del slide */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh", padding: "8rem 6% 5rem"
      }}>
        <span style={{
          fontFamily: "var(--body)", fontSize: "0.72rem", fontWeight: 500,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--verde-osc)", marginBottom: "1.2rem", display: "block"
        }}>
          {slide.eyebrow}
        </span>

        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 300,
          fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05,
          color: "var(--verde-osc)", marginBottom: "1.4rem"
        }}>
          {slide.titulo[0]}<br />
          <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>
            {slide.titulo[1]}
          </em>
        </h1>

        <p style={{
          fontSize: "1rem", fontWeight: 300, color: "#5a5a5a",
          lineHeight: 1.8, maxWidth: "520px", marginBottom: "2.8rem"
        }}>
          {slide.texto}
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href={slide.btn1.href} style={{
            padding: "0.85rem 2rem", background: "var(--verde-osc)",
            color: "var(--blanco)", fontSize: "0.8rem", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none"
          }}>
            {slide.btn1.texto}
          </a>
          <a href={slide.btn2.href} style={{
            padding: "0.85rem 2rem", background: "transparent",
            border: "1.5px solid var(--verde-osc)", color: "var(--verde-osc)",
            fontSize: "0.8rem", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none"
          }}>
            {slide.btn2.texto}
          </a>
        </div>
      </div>

      {/* Flecha izquierda */}
      <button onClick={() => irA(slideActual - 1)} style={{
        position: "absolute", top: "50%", left: "1.5rem",
        transform: "translateY(-50%)", zIndex: 5,
        width: "48px", height: "48px", border: "none",
        background: "rgba(61,90,71,0.65)", color: "var(--blanco)",
        fontSize: "1.8rem", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>‹</button>

      {/* Flecha derecha */}
      <button onClick={() => irA(slideActual + 1)} style={{
        position: "absolute", top: "50%", right: "1.5rem",
        transform: "translateY(-50%)", zIndex: 5,
        width: "48px", height: "48px", border: "none",
        background: "rgba(61,90,71,0.65)", color: "var(--blanco)",
        fontSize: "1.8rem", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>›</button>

      {/* Puntos indicadores */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 5,
        display: "flex", gap: "0.6rem"
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => irA(i)} style={{
            width: "11px", height: "11px", borderRadius: "50%", border: "none",
            background: i === slideActual ? "var(--verde-osc)" : "rgba(61,90,71,0.35)",
            transform: i === slideActual ? "scale(1.3)" : "scale(1)",
            cursor: "pointer", transition: "all 0.25s"
          }} />
        ))}
      </div>
    </section>
  )
}

export default Hero
