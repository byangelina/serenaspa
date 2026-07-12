import { useState, useEffect } from "react"

function Navbar() {
  // Estado para sombra al hacer scroll
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const manejarScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", manejarScroll)
    // Limpieza del evento al desmontar el componente
    return () => window.removeEventListener("scroll", manejarScroll)
  }, [])

  const links = ["servicios", "nosotras", "galeria", "faq", "contacto"]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem 6%",
      background: "rgba(250,250,247,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(143,175,140,0.25)",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
      transition: "box-shadow 0.3s"
    }}>
      <a href="#inicio" style={{
        fontFamily: "var(--display)", fontSize: "1.5rem", fontWeight: 300,
        color: "var(--verde-osc)", letterSpacing: "0.04em", textDecoration: "none"
      }}>
        Serena Spa
      </a>

      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {links.map(link => (
          <li key={link}>
            <a href={`#${link}`} style={{
              fontFamily: "var(--body)", fontSize: "0.78rem", fontWeight: 400,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#4a4a4a", textDecoration: "none"
            }}>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contacto" style={{
        padding: "0.55rem 1.4rem",
        background: "var(--verde-osc)", color: "var(--blanco)",
        fontSize: "0.75rem", fontWeight: 500,
        letterSpacing: "0.1em", textTransform: "uppercase",
        textDecoration: "none"
      }}>
        Reservar
      </a>
    </nav>
  )
}

export default Navbar
