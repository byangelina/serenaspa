import { useState, useEffect } from "react"

// Servicios disponibles para el select
const SERVICIOS_OPCIONES = [
  "Manicura / Pedicura",
  "Masaje relajante",
  "Masaje descontracturante",
  "Peluquería",
  "Tratamiento facial",
  "Combo (varios servicios)"
]

// Estado inicial limpio para el formulario
const FORM_INICIAL = {
  nombre: "",
  telefono: "",
  servicio: "",
  fecha: "",
  hora: "9:00",
  mensaje: ""
}

function Contacto() {
  // ── ESTADO DEL FORMULARIO ──────────────────────────────────────────────
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const [modoEdicion, setModoEdicion] = useState(null)
  const [mostrarLista, setMostrarLista] = useState(false)

  // ── LOCAL STORAGE — CRUD ───────────────────────────────────────────────
  const [reservas, setReservas] = useState(() => {
    const guardadas = localStorage.getItem("serena_reservas")
    return guardadas ? JSON.parse(guardadas) : []
  })

  // Persistencia: guardar cada vez que cambian las reservas
  useEffect(() => {
    localStorage.setItem("serena_reservas", JSON.stringify(reservas))
  }, [reservas])

  // ── VALIDACIONES ───────────────────────────────────────────────────────
  const validar = () => {
    const nuevosErrores = {}

    if (!form.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio"
    else if (form.nombre.trim().length < 2)
      nuevosErrores.nombre = "Nombre demasiado corto"

    if (!form.telefono.trim())
      nuevosErrores.telefono = "El teléfono es obligatorio"
    else if (!/^\+?[\d\s]{8,15}$/.test(form.telefono.trim()))
      nuevosErrores.telefono = "Formato inválido (ej: +56 9 1234 5678)"

    if (!form.servicio)
      nuevosErrores.servicio = "Selecciona un servicio"

    if (!form.fecha)
      nuevosErrores.fecha = "Selecciona una fecha"
    else {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      if (new Date(form.fecha) < hoy)
        nuevosErrores.fecha = "La fecha no puede ser en el pasado"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // ── CREATE ─────────────────────────────────────────────────────────────
  const agregarReserva = () => {
    if (!validar()) return

    const nueva = {
      id: Date.now(),
      ...form,
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      fechaCreacion: new Date().toLocaleDateString("es-CL")
    }
    setReservas([...reservas, nueva])
    setForm(FORM_INICIAL)
    setErrores({})
    alert(`Reserva de ${nueva.nombre} registrada correctamente.`)
  }

  // ── UPDATE: cargar datos en el formulario para editar ──────────────────
  const editarReserva = (reserva) => {
    setForm({
      nombre: reserva.nombre,
      telefono: reserva.telefono,
      servicio: reserva.servicio,
      fecha: reserva.fecha,
      hora: reserva.hora,
      mensaje: reserva.mensaje
    })
    setModoEdicion(reserva.id)
    window.scrollTo({ top: document.getElementById("contacto").offsetTop, behavior: "smooth" })
  }

  // ── UPDATE: guardar cambios ────────────────────────────────────────────
  const guardarEdicion = () => {
    if (!validar()) return

    const actualizadas = reservas.map(r =>
      r.id === modoEdicion
        ? { ...r, ...form, nombre: form.nombre.trim(), telefono: form.telefono.trim() }
        : r
    )
    setReservas(actualizadas)
    setForm(FORM_INICIAL)
    setModoEdicion(null)
    setErrores({})
    alert("Reserva actualizada correctamente.")
  }

  // ── DELETE ─────────────────────────────────────────────────────────────
  const eliminarReserva = (id) => {
    if (!window.confirm("¿Eliminar esta reserva?")) return
    setReservas(reservas.filter(r => r.id !== id))
  }

  // ── CANCELAR EDICIÓN ───────────────────────────────────────────────────
  const cancelarEdicion = () => {
    setForm(FORM_INICIAL)
    setModoEdicion(null)
    setErrores({})
  }

  // ── MANEJADOR GENÉRICO DE INPUTS ───────────────────────────────────────
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: "" }))
  }

  // ── ESTILOS REUTILIZABLES ──────────────────────────────────────────────
  const inputStyle = (campo) => ({
    width: "100%", padding: "0.75rem 0.9rem",
    border: `1.5px solid ${errores[campo] ? "#e05252" : "rgba(143,175,140,0.4)"}`,
    background: "var(--blanco)", fontFamily: "var(--body)",
    fontSize: "0.88rem", color: "#2a2a2a",
    outline: "none", borderRadius: "0", marginBottom: "0.3rem"
  })

  const labelStyle = {
    display: "block", fontSize: "0.68rem", fontWeight: 500,
    letterSpacing: "0.12em", textTransform: "uppercase",
    color: "#4a4a4a", marginBottom: "0.4rem"
  }

  const errorStyle = {
    fontSize: "0.72rem", color: "#e05252", marginBottom: "0.9rem", display: "block"
  }

  // Datos de contacto reales
  const INFO_CONTACTO = [
    { label: "Dirección", texto: "Av. Matucana 466, Santiago, Región Metropolitana" },
    { label: "Horario",   texto: "Lunes a viernes: 9:00 – 20:00 / Sábado: 9:00 – 17:00" },
    { label: "WhatsApp",  texto: "+56 9 2030 1634" },
    { label: "Email",     texto: "valery.catalina14@gmail.com" }
  ]

  return (
    <section id="contacto" style={{ background: "var(--crema)", padding: "6rem 6%" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "5rem", alignItems: "start"
      }}>

        {/* ── Información de contacto ── */}
        <div>
          <span style={{
            display: "block", fontSize: "0.72rem", fontWeight: 500,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--cacao)", marginBottom: "0.8rem"
          }}>
            {modoEdicion ? "Editando reserva" : "Reserva tu hora"}
          </span>
          <h2 style={{
            fontFamily: "var(--display)", fontWeight: 300,
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--verde-osc)",
            marginBottom: "2rem", lineHeight: 1.2
          }}>
            Empieza tu <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>experiencia</em>
          </h2>

          {INFO_CONTACTO.map((d, i) => (
            <div key={i} style={{ marginBottom: "1.3rem" }}>
              <strong style={{
                display: "block", fontSize: "0.68rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--cacao)", marginBottom: "0.15rem"
              }}>{d.label}</strong>
              <span style={{ fontSize: "0.85rem", fontWeight: 300, color: "#4a4a4a", lineHeight: 1.6 }}>
                {d.texto}
              </span>
            </div>
          ))}

          {/* Botón para ver/ocultar lista de reservas */}
          <button
            onClick={() => setMostrarLista(!mostrarLista)}
            style={{
              marginTop: "1rem", padding: "0.6rem 1.2rem",
              background: "var(--verde-osc)", color: "var(--blanco)",
              border: "none", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase"
            }}
          >
            {mostrarLista ? "Ocultar reservas" : `Ver reservas (${reservas.length})`}
          </button>
        </div>

        {/* ── Formulario ── */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input
                name="nombre" type="text" placeholder="Tu nombre"
                value={form.nombre} onChange={manejarCambio}
                style={inputStyle("nombre")}
              />
              {errores.nombre && <span style={errorStyle}>{errores.nombre}</span>}
            </div>
            <div>
              <label style={labelStyle}>Teléfono</label>
              <input
                name="telefono" type="tel" placeholder="+56 9 ..."
                value={form.telefono} onChange={manejarCambio}
                style={inputStyle("telefono")}
              />
              {errores.telefono && <span style={errorStyle}>{errores.telefono}</span>}
            </div>
          </div>

          <label style={labelStyle}>Servicio</label>
          <select
            name="servicio" value={form.servicio} onChange={manejarCambio}
            style={{ ...inputStyle("servicio"), marginBottom: "0.3rem" }}
          >
            <option value="">Selecciona un servicio</option>
            {SERVICIOS_OPCIONES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errores.servicio && <span style={errorStyle}>{errores.servicio}</span>}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Fecha</label>
              <input
                name="fecha" type="date"
                value={form.fecha} onChange={manejarCambio}
                style={inputStyle("fecha")}
              />
              {errores.fecha && <span style={errorStyle}>{errores.fecha}</span>}
            </div>
            <div>
              <label style={labelStyle}>Hora preferida</label>
              <select
                name="hora" value={form.hora} onChange={manejarCambio}
                style={{ ...inputStyle("hora"), marginBottom: "1.1rem" }}
              >
                {["9:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"].map(h => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <label style={labelStyle}>Mensaje (opcional)</label>
          <textarea
            name="mensaje" placeholder="¿Algo especial que debamos saber?"
            value={form.mensaje} onChange={manejarCambio}
            style={{
              ...inputStyle("mensaje"),
              resize: "vertical", minHeight: "90px", marginBottom: "1.3rem"
            }}
          />

          {/* Botones CREATE o UPDATE */}
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button
              onClick={modoEdicion ? guardarEdicion : agregarReserva}
              style={{
                flex: 1, padding: "0.9rem",
                background: modoEdicion ? "var(--cacao)" : "var(--verde-osc)",
                color: "var(--blanco)", fontFamily: "var(--body)",
                fontSize: "0.8rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "none", cursor: "pointer"
              }}
            >
              {modoEdicion ? "Guardar cambios" : "Solicitar hora"}
            </button>
            {modoEdicion && (
              <button onClick={cancelarEdicion} style={{
                padding: "0.9rem 1.4rem",
                background: "transparent", color: "var(--gris)",
                border: "1.5px solid rgba(0,0,0,0.2)", cursor: "pointer",
                fontSize: "0.8rem", fontWeight: 500
              }}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Lista de reservas (READ + UPDATE + DELETE) ── */}
      {mostrarLista && (
        <div style={{ marginTop: "4rem" }}>
          <h3 style={{
            fontFamily: "var(--display)", fontSize: "1.5rem",
            color: "var(--verde-osc)", marginBottom: "1.5rem", fontWeight: 400
          }}>
            Reservas registradas ({reservas.length})
          </h3>

          {reservas.length === 0 ? (
            <p style={{ color: "var(--gris)", fontSize: "0.9rem" }}>No hay reservas aún.</p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem"
            }}>
              {reservas.map(r => (
                <div key={r.id} style={{
                  background: "var(--blanco)", padding: "1.5rem",
                  border: "1px solid rgba(143,175,140,0.3)"
                }}>
                  <p style={{ fontWeight: 500, color: "var(--verde-osc)", marginBottom: "0.4rem" }}>
                    {r.nombre}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--gris)", marginBottom: "0.2rem" }}>
                    {r.telefono}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--gris)", marginBottom: "0.2rem" }}>
                    {r.servicio}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--gris)", marginBottom: "0.2rem" }}>
                    {r.fecha} — {r.hora}
                  </p>
                  {r.mensaje && (
                    <p style={{ fontSize: "0.78rem", color: "var(--gris)", fontStyle: "italic", marginTop: "0.5rem" }}>
                      "{r.mensaje}"
                    </p>
                  )}
                  <p style={{ fontSize: "0.7rem", color: "rgba(90,90,90,0.5)", marginTop: "0.5rem" }}>
                    Creada: {r.fechaCreacion}
                  </p>

                  {/* Botones UPDATE y DELETE */}
                  <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                    <button onClick={() => editarReserva(r)} style={{
                      flex: 1, padding: "0.5rem",
                      background: "var(--verde-osc)", color: "var(--blanco)",
                      border: "none", cursor: "pointer",
                      fontSize: "0.75rem", fontWeight: 500
                    }}>
                      Editar
                    </button>
                    <button onClick={() => eliminarReserva(r.id)} style={{
                      flex: 1, padding: "0.5rem",
                      background: "#e05252", color: "#fff",
                      border: "none", cursor: "pointer",
                      fontSize: "0.75rem", fontWeight: 500
                    }}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Contacto
