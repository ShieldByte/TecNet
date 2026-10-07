// Ficha técnica del reto: Subcadena mínima
const ficha = {
  integrante: "Robert Duran Castillo",
  rama: "tecnet_robert",
  reto: "Subcadena mínima",

  enunciado:
    "Diseñar una función que reciba dos cadenas (muestra y palabra) y encuentre " +
    "la menor subcadena de palabra que contenga todos los caracteres de muestra. " +
    "No importa el orden, pero sí las repeticiones (para 'taza' no vale 'tza').",

  analisis: {
    entradas: ["muestra: caracteres a buscar", "palabra: cadena donde se busca"],
    proceso:
      "Se cuenta la frecuencia de cada carácter de la muestra y se recorre la palabra " +
      "con una ventana deslizante que se expande hasta cubrir todos los caracteres " +
      "requeridos y se contrae para obtener la ventana más corta.",
    salida: "La subcadena mínima, o un mensaje si no existe ninguna válida.",
    restricciones: [
      "Si alguna cadena está vacía no hay solución",
      "Si la muestra es más larga que la palabra no hay solución",
      "La comparación distingue mayúsculas y minúsculas"
    ]
  },

  conceptosUtilizados: [
    "Ventana deslizante (sliding window)",
    "Objetos como mapas de frecuencia",
    "Ciclos for y while",
    "Manejo de cadenas (substring)",
    "Eventos del DOM (submit) y preventDefault()",
    "Manipulación del DOM (getElementById, textContent, classList)",
    "Complejidad algorítmica O(n + m)"
  ],

  resena:
    "Se desarrolló una página que recibe la muestra y la palabra, ejecuta cadMinima() " +
    "y muestra el resultado. Si no hay solución, el resultado se muestra en rojo.",

  conclusion:
    "La mayor dificultad fue respetar las repeticiones de caracteres; se resolvió " +
    "con mapas de frecuencia y un contador de caracteres formados. La ventana " +
    "deslizante evita revisar todas las subcadenas posibles.",

  aportaciones: [
    "Implementación de cadMinima() en reto.js",
    "Interfaz web en index.html y styles.css",
    "Pruebas funcionales documentadas en pruebas.md"
  ]
};