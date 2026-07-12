// Muestra las sucursales del spa ordenadas por cercanía real,
// calculada con la API pública de OSRM (rutas.js) 
import { useState, useEffect } from "react"
import { useGeolocation } from "../hooks/useGeolocation.js"
import { calcularRuta } from "../services/rutas.js"
import { SUCURSALES } from "../data/sucursales.js"

function Sucursales() {
  const { ubicacion, estado: estadoUbicacion } = useGeolocation()

  const [sucursalesConRuta, setSucursalesConRuta] = useState([])
  const [estadoRutas, setEstadoRutas] = useState("esperando") // esperando | cargando | listo | error
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    // Solo calculamos rutas cuando ya tenemos la ubicación de la clienta
    if (estadoUbicacion !== "listo" || !ubicacion) return

    async function calcularTodas() {
      setEstadoRutas("cargando")
      setErrorMsg("")

      try {
        const resultados = await Promise.all(
          SUCURSALES.map(async (sucursal) => {
            const ruta = await calcularRuta(ubicacion, { lat: sucursal.lat, lng: sucursal.lng })
            return { ...sucursal, ...ruta }
          })
        )

        // Ordenamos de la más cercana a la más lejana
        resultados.sort((a, b) => a.distanciaKm - b.distanciaKm)

        setSucursalesConRuta(resultados)
        setEstadoRutas("listo")
      } catch (error) {
        setErrorMsg(error.message)
        setEstadoRutas("error")
      }
    }

    calcularTodas()
  }, [estadoUbicacion, ubicacion])

  return (
    <section id="sucursales" style={{ background: "var(--blanco)", padding: "6rem 6%" }}>
      <span style={{
        display: "block", fontSize: "0.72rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--verde)", marginBottom: "0.8rem"
      }}>
        Encuentra tu sucursal
      </span>
      <h2 style={{
        fontFamily: "var(--display)", fontWeight: 300,
        fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--verde-osc)",
        marginBottom: "3rem", lineHeight: 1.15
      }}>
        La más <em style={{ fontStyle: "italic", color: "var(--cacao)" }}>cercana a ti</em>
      </h2>

      {/* Estado: esperando permiso de ubicación */}
      {estadoUbicacion === "cargando" && (
        <p style={{ color: "var(--gris)" }}>Buscando tu ubicación...</p>
      )}

      {/* Estado: la usuaria rechazó el permiso */}
      {estadoUbicacion === "rechazado" && (
        <p style={{ color: "var(--gris)" }}>
          No pudimos acceder a tu ubicación. Actívala en tu navegador para ver la sucursal más cercana.
        </p>
      )}

      {/* Estado: el navegador no soporta geolocalización */}
      {estadoUbicacion === "error" && (
        <p style={{ color: "var(--gris)" }}>Tu navegador no permite calcular distancias automáticamente.</p>
      )}

      {/* Estado: calculando rutas */}
      {estadoRutas === "cargando" && (
        <p style={{ color: "var(--gris)" }}>Calculando distancias a cada sucursal...</p>
      )}

      {/* Estado: error al calcular rutas */}
      {estadoRutas === "error" && (
        <p style={{ color: "#e05252" }}>{errorMsg}</p>
      )}

      {/* Estado: éxito, mostramos la lista */}
      {estadoRutas === "listo" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.2rem"
        }}>
          {sucursalesConRuta.map(s => (
            <div key={s.id} style={{
              background: "var(--crema)", padding: "1.5rem",
              border: "1px solid rgba(143,175,140,0.3)"
            }}>
              <p style={{ fontWeight: 500, color: "var(--verde-osc)", marginBottom: "0.4rem" }}>
                {s.nombre}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--gris)", marginBottom: "0.4rem" }}>
                {s.direccion}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--cacao)" }}>
                {s.distanciaKm} km · {s.duracionMin} min en auto
              </p>
              <a
              href={`https://www.openstreetmap.org/directions?from=${ubicacion.lat},${ubicacion.lng}&to=${s.lat},${s.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block", marginTop: "0.8rem",
                  fontSize: "0.75rem", fontWeight: 500,
                  color: "var(--verde-osc)", textDecoration: "underline"
                }}
              >
                Ver ruta en el mapa →
              </a>
              <button
                onClick={() => {
                  localStorage.setItem("serena_sucursal_elegida", s.nombre)
                  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })
                }}
                style={{
                  display: "block", marginTop: "0.8rem",
                  padding: "0.5rem 1rem",
                  background: "var(--verde-osc)", color: "var(--blanco)",
                  border: "none", cursor: "pointer",
                  fontSize: "0.75rem", fontWeight: 500,
                  letterSpacing: "0.05em", textTransform: "uppercase"
                }}
              >
                Reservar en esta sucursal
              </button>
            </div> 
          ))}
        </div>
      )}
    </section>
  )
}

export default Sucursales