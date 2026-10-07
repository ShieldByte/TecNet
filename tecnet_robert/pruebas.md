# Pruebas: Subcadena mínima (tecnet_robert)

## Pruebas funcionales

| # | Muestra | Palabra   | Resultado esperado | Resultado obtenido | Estado |
|---|---------|-----------|--------------------|--------------------|--------|
| 1 | nasa    | antesala  | antesa             | antesa             | ✅ |
| 2 | nesa    | antesala  | antes              | antes              | ✅ |
| 3 | abc     | aabbcc    | abbc               | abbc               | ✅ |
| 4 | taza    | tza       | Sin resultado      | Sin resultado      | ✅ |
| 5 | xyz     | abc       | Sin resultado      | Sin resultado      | ✅ |

**Notas:**
- Prueba 3: comprueba que se encuentra la ventana más corta aunque haya repeticiones.
- Prueba 4: la muestra es más larga que la palabra.
- Prueba 5: los caracteres de la muestra no existen en la palabra.

## Control de versiones

- Rama de trabajo: `tecnet_robert` (creada desde `main`)
- Commit: `feature: añadido un buscador de strings dentro de un string de mayor tamaño` (`0b3b337`)
- Integración: Pull Request hacia `main` sin conflictos