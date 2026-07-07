import { useState } from "react"

// Datos de las preguntas frecuentes
const PREGUNTAS = [
  {
    pregunta: "¿Necesito evaluación previa?",
    respuesta: "Para servicios capilares sí realizamos una evaluación personalizada. Para masajes y faciales, nuestra especialista te asesora al inicio de la sesión para adaptar el tratamiento a tus necesidades."
  },
  {
    pregunta: "¿Puedo combinar servicios en una misma visita?",
    respuesta: "Sí. Muchos de nuestros tratamientos se pueden combinar. Te recomendamos agendar con anticipación para reservar el tiempo necesario y que tu experiencia sea sin apuros."
  },
  {
    pregunta: "¿Cuánto dura cada sesión?",
    respuesta: "Depende del servicio: manicura entre 45–90 min, masajes entre 60–90 min, peluquería entre 1–3 hrs y faciales entre 60–75 min. Te confirmamos el tiempo al agendar."
  },
  {
    pregunta: "¿Qué productos usan?",
    respuesta: "Trabajamos con marcas profesionales con certificación dermatológica, libres de ingredientes agresivos. Priorizamos productos con política ambiental responsable."
  },
  {
    pregunta: "¿Cómo reservo mi hora?",
    respuesta: "Puedes reservar por WhatsApp, desde este sitio web o llamando directamente. Confirmamos disponibilidad y te enviamos recordatorio antes de tu cita."
  }
]

// Componente reutilizable para cada ítem del acordeón
function FaqItem({ pregunta, respuesta }) {
  // Estado individual de apertura
  const [abierto, setAbierto] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid rgba(143,175,140,0.3)" }}>
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          width: "100%", background: "none", border: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.3rem 0", cursor: "pointer", textAlign: "left", gap: "1rem"
        }}
      >
        <span style={{
          fontFamily: "var(--body)", fontSize: "0.92rem",
          fontWeight: 400, color: "var(--verde-osc)"
        }}>
          {pregunta}
        </span>
        <span style={{
          fontSize: "1.2rem", color: "var(--verde)", flexShrink: 0,
          transform: abierto ? "rotate(45deg)" : "none",
          transition: "transform 0.3s"
        }}>
          +
        </span>
      </button>

      {/* Respuesta colapsable */}
      <div style={{
        maxHeight: abierto ? "200px" : "0",
        overflow: "hidden",
        transition: "max-height 0.35s ease",
        paddingBottom: abierto ? "1.3rem" : "0"
      }}>
        <p style={{
          fontSize: "0.85rem", fontWeight: 300,
          color: "#5a5a5a", lineHeight: 1.8
        }}>
          {respuesta}
        </p>
      </div>
    </div>
  )
}

function FAQ() {
  return (
    <section id="faq" style={{ background: "var(--blanco)", padding: "6rem 6%" }}>
      <span style={{
        display: "block", fontSize: "0.72rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--verde)", marginBottom: "0.8rem"
      }}>
        Preguntas frecuentes
      </span>
      <h2 style={{
        fontFamily: "var(--display)", fontWeight: 300,
        fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--verde-osc)",
        marginBottom: "3rem", lineHeight: 1.15
      }}>
        Resolvemos tus <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>dudas</em>
      </h2>

      <div style={{ maxWidth: "720px" }}>
        {PREGUNTAS.map((p, i) => (
          <FaqItem key={i} pregunta={p.pregunta} respuesta={p.respuesta} />
        ))}
      </div>
    </section>
  )
}

export default FAQ
