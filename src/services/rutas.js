// Servicio que consume la API pública de OSRM 
export async function calcularRuta(origen, destino) {
  // Construimos la URL con las coordenadas de origen y destino
  const url = `https://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=false`

  let respuesta
  try {
    respuesta = await fetch(url)
  } catch (errorDeRed) {
    throw new Error("No se pudo conectar con el servicio de rutas. Revisa tu conexión.")
  }

  if (!respuesta.ok) {
    throw new Error(`El servicio de rutas respondió con un error (código ${respuesta.status})`)
  }
  const datos = await respuesta.json()

  // Validamos la estructura de datos
  if (!datos.routes || datos.routes.length === 0) {
    throw new Error("No se encontró una ruta disponible entre estos dos puntos.")
  }

  const ruta = datos.routes[0]

  if (typeof ruta.distance !== "number" || typeof ruta.duration !== "number") {
    throw new Error("La respuesta del servicio de rutas llegó incompleta.")
  }

  // OSRM entrega distancia en metros y duración. Convertimos a km y minutos
  return {
    distanciaKm: Math.round(ruta.distance / 100) / 10,   
    duracionMin: Math.round(ruta.duration / 60)            
  }
}