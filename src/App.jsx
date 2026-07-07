// ── App.jsx · Serena Spa ──────────────────────────────────────────────────
// Aplicación principal que une todos los componentes.
// El CRUD con Local Storage vive en Contacto.jsx.
// Patrón: igual al ejemplo del curso (useState + useEffect + LocalStorage).

import Navbar    from "./components/Navbar.jsx"
import Hero      from "./components/Hero.jsx"
import Servicios from "./components/Servicios.jsx"
import Nosotras  from "./components/Nosotras.jsx"
import Galeria   from "./components/Galeria.jsx"
import FAQ       from "./components/FAQ.jsx"
import Contacto  from "./components/Contacto.jsx"
import Footer    from "./components/Footer.jsx"

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Servicios />
      <Nosotras />
      <Galeria />
      <FAQ />
      <Contacto />
      <Footer />
    </div>
  )
}

export default App
