let preguntas = [];
let preguntasUsadas = new Set();
let preguntasModoActual = '';

document.getElementById('btn-siguiente').addEventListener('click', () => {
  const contenedor = document.getElementById('pregunta');

  if (!preguntas.length) {
    contenedor.textContent = "No hay preguntas disponibles para este modo.";
    return;
  }

  const pregunta = obtenerPreguntaNoRepetida();
  
  if (pregunta) {
    contenedor.textContent = pregunta;
  } else {
    contenedor.textContent = "¡Ya viste todas las preguntas!";
  }
});

// Botón para cambiar de modo
document.getElementById('btn-cambiar-modo').addEventListener('click', () => {
  mostrarModal();
});

// Mostrar modal
function mostrarModal() {
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('pregunta').textContent = "Selecciona un modo para comenzar";
  document.getElementById('modo-actual').textContent = "";
  document.getElementById('btn-siguiente').disabled = true;
}

// Selección de modo
async function seleccionarModo(modo) {
  preguntasModoActual = modo;
  preguntasUsadas.clear();
  preguntas = await cargarPreguntas(modo);

  document.getElementById('modo-actual').textContent = `Modo: ${modo.toUpperCase()}`;
  document.getElementById('btn-siguiente').disabled = false;

  if (preguntas.length > 0) {
    document.getElementById('pregunta').textContent = "Haz clic en 'Siguiente Pregunta'";
  } else {
    document.getElementById('pregunta').textContent = "No hay preguntas disponibles para este modo.";
  }

  cerrarModal();
}

// Cargar JSON según el modo
async function cargarPreguntas(modo) {
  try {
    const res = await fetch(`preguntas/${modo}.json`);
    if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
    const data = await res.json();
    console.log(`Preguntas cargadas para ${modo}:`, data);
    return data;
  } catch (error) {
    console.error("Error al cargar preguntas:", error);
    return [];
  }
}

// Obtener pregunta no repetida
function obtenerPreguntaNoRepetida() {
  const restantes = preguntas.filter(p => !preguntasUsadas.has(p));
  if (restantes.length === 0) return null;

  const seleccionada = restantes[Math.floor(Math.random() * restantes.length)];
  preguntasUsadas.add(seleccionada);
  return seleccionada;
}

// Cerrar modal
function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

  