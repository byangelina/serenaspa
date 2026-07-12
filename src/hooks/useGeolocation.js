// Hook: Ubicación actual del usuario "punto de origen" usando la API del navegador.
// No es la API externa del proyecto (esa es OSRM).
import { useState, useEffect } from "react"

export function useGeolocation() {
  const [ubicacion, setUbicacion] = useState(null)   // lat, lng  
  const [estado, setEstado] = useState("cargando")     

  useEffect(() => {
    if (!navigator.geolocation) {
      setEstado("error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      //si es q el usuario dio permiso y se obtuvo la ubicación
      (posicion) => {
        setUbicacion({
          lat: posicion.coords.latitude,
          lng: posicion.coords.longitude
        })
        setEstado("listo")
      },
      // si el usuario rechazó el permiso, o falló por otra razón
      (error) => {
        console.error("Error de geolocalización:", error.message)
        setEstado("rechazado")
      }
    )
  }, [])  
  return { ubicacion, estado }
}