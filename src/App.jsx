// ── App.jsx · Serena Spa ──────────────────────────────────────────────────
// Aplicación principal que une todos los componentes.
// El CRUD con Local Storage vive en Contacto.jsx.

import Navbar   from "./components/Navbar.jsx"
import Hero     from "./components/Hero.jsx"
import Nosotras from "./components/Nosotras.jsx"
import Galeria  from "./components/Galeria.jsx"
import FAQ      from "./components/FAQ.jsx"
import Contacto from "./components/Contacto.jsx"
import Footer   from "./components/Footer.jsx"

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Nosotras />
      <Galeria />
      <FAQ />
      <Contacto />
      <Footer />
    </div>
  )
}

export default App
