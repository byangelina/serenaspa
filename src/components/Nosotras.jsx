// Datos de los diferenciadores del spa
const DIFERENCIADORES = [
  { icono: "🫶", texto: "Atención dedicada, solo para ti" },
  { icono: "🌱", texto: "Productos naturales y certificados" },
  { icono: "🧘‍♀️", texto: "Ambiente de terapia emocional" },
  { icono: "💬", texto: "Escucha activa y sin juicios" },
  { icono: "⏱️", texto: "Tu tiempo, respetado siempre" }
]

// Componente reutilizable para cada ítem diferenciador
function DifItem({ icono, texto }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "1rem",
      padding: "1rem 1.2rem",
      background: "rgba(250,250,247,0.06)",
      border: "1px solid rgba(250,250,247,0.1)"
    }}>
      <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{icono}</span>
      <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(250,250,247,0.85)" }}>
        {texto}
      </p>
    </div>
  )
}

function Nosotras() {
  return (
    <section id="nosotras" style={{
      background: "var(--verde-osc)", padding: "6rem 6%",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: "5rem", alignItems: "center"
    }}>
      {/* Texto de misión */}
      <div>
        <span style={{
          display: "block", fontSize: "0.72rem", fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--verde)", marginBottom: "1rem"
        }}>
          Nuestra misión
        </span>
        <h2 style={{
          fontFamily: "var(--display)", fontWeight: 300,
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          color: "var(--blanco)", lineHeight: 1.2, marginBottom: "1.5rem"
        }}>
          Un espacio de{" "}
          <em style={{ fontStyle: "italic", color: "var(--verde)" }}>confianza</em>
          {" "}y terapia emocional
        </h2>
        <p style={{
          fontSize: "0.92rem", fontWeight: 300,
          color: "rgba(250,250,247,0.72)", lineHeight: 1.9, marginBottom: "1rem"
        }}>
          Creemos que el cuidado personal va más allá de la estética. En Serena Spa, cada visita
          es una pausa: un momento donde puedes ser tú misma, sin presiones ni juicios.
        </p>
        <p style={{
          fontSize: "0.92rem", fontWeight: 300,
          color: "rgba(250,250,247,0.72)", lineHeight: 1.9, marginBottom: "1rem"
        }}>
          Nuestro ambiente fue diseñado para activar el sistema nervioso parasimpático — la calma
          real. Música, aromas, texturas y una atención humana y cálida.
        </p>
        <p style={{
          fontSize: "0.85rem", fontStyle: "italic",
          color: "rgba(143,175,140,0.9)", lineHeight: 1.7
        }}>
          Alineadas con el ODS 3: Salud y Bienestar, integramos el bienestar emocional como
          parte del servicio, no como un extra.
        </p>
      </div>

      {/* Lista de diferenciadores */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {DIFERENCIADORES.map((d, i) => (
          <DifItem key={i} icono={d.icono} texto={d.texto} />
        ))}
      </div>
    </section>
  )
}

export default Nosotras
