export const ficha = {
  equipo: "Equipo TecNet",
  reto: "Generador de Contraseñas Seguras",
  conceptosClave: [
    {
      concepto: "Manipulación del DOM y eventos",
      referencia: "Se usa addEventListener('input') y 'click' para actualizar en tiempo real el valor del rango de caracteres y disparar la generación."
    },
    {
      concepto: "Generación de números aleatorios y arreglos",
      referencia: "Uso de Math.floor(Math.random() * n) junto con el algoritmo Fisher-Yates para barajar los caracteres del arreglo de forma uniforme."
    },
    {
      concepto: "Expresiones Regulares (RegExp)",
      referencia: "Uso de pruebas .test() para validar la presencia de mayúsculas, números y caracteres especiales al calcular la robustez de la contraseña."
    }
  ],
  conclusion: {
    decision: "Garantizar al menos un carácter de cada tipo seleccionado antes de rellenar la longitud total, asegurando que la clave cumpla las restricciones elegidas.",
    dificultadResuelta: "Evitar sesgos en la posición de los caracteres generados implementando un barajado de Fisher-Yates al arreglo final.",
    limitacion: "La evaluación de robustez se basa en longitud y tipos de caracteres presentes, sin verificar diccionarios de palabras comunes filtradas.",
    aprendizajeGit: "La independencia de trabajar en ramas individuales previene sobreescrituras en main y facilita la integración mediante Pull Requests."
  }
};