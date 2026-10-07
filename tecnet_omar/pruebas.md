# Pruebas y Control de Calidad - Generador de Contraseñas

## 1. Casos de Prueba Ejecutados

| ID | Caso de Prueba | Entrada | Resultado Esperado | Estado |
|---|---|---|---|---|
| CP-01 | Generación básica estándar | Longitud 12, todas las casillas marcadas | Genera cadena de 12 caracteres con al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo | Exitoso |
| CP-02 | Longitud mínima | Longitud 6, todas las casillas marcadas | Genera cadena exacta de 6 caracteres | Exitoso |
| CP-03 | Longitud máxima | Longitud 32, todas las casillas marcadas | Genera cadena exacta de 32 caracteres con nivel "Fuerte" | Exitoso |
| CP-04 | Validación sin opciones | Ninguna casilla marcada, clic en Generar | Mensaje de advertencia: "Debes seleccionar al menos una opción", no genera clave | Exitoso |
| CP-05 | Copia al portapapeles | Clic en botón "Copiar" tras generar | El texto se copia en el portapapeles y se muestra mensaje visual de confirmación | Exitoso |

---

## 2. Documentación de Conflicto Controlado en Git

- **Escenario simulado:** Dos modificaciones simultáneas sobre la longitud predeterminada de la contraseña en `reto.js` (un commit fijaba el valor por defecto en `16` y en otra rama se modificó a `12`).
- **Detección:** Al intentar fusionar con `git merge origin/main`, Git detuvo la operación indicando `CONFLICT (content): Merge conflict in reto.js`.
- **Resolución:** Se abrieron los marcadores de conflicto `<<<<<<<`, `=======` y `>>>>>>>`, acordando en equipo mantener `12` como valor estándar balanceado.
- **Cierre:** Se ejecutó `git add reto.js` y `git commit -m "fix(merge): resuelve conflicto en valor inicial de longitud"`.