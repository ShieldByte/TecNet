# Pruebas - Reservación de asesorías TI

## Prueba 1: Seleccionar un horario disponible
Acción: Seleccionar el horario Jueves - 13:00.

Resultado esperado: El horario cambia a color azul y aparece en el resumen.

Resultado obtenido: Correcto.


## Prueba 2: Cambiar de horario
Acción: Seleccionar un horario disponible y después seleccionar otro.

Resultado esperado: El primer horario vuelve a estar disponible y solamente el nuevo queda seleccionado.

Resultado obtenido: Correcto.


## Prueba 3: Seleccionar un horario no disponible
Acción: Intentar seleccionar uno de los horarios marcados en color rojo.

Resultado esperado: El sistema no permite seleccionarlo.

Resultado obtenido: Correcto.


## Prueba 4: Cambio de servicio
Acción: Seleccionar un horario y cambiar el servicio de asesoría.

Resultado esperado: El nombre del servicio y su costo se actualizan automáticamente.

Resultado obtenido: Correcto.


## Prueba 5: Confirmar reservación
Acción: Seleccionar un horario disponible y presionar "Reservar asesoría".

Resultado esperado: Se muestra un mensaje de confirmación y el horario pasa al estado no disponible.

Resultado obtenido: Correcto.


## Prueba 6: Reservación sin horario
Acción: Presionar "Reservar asesoría" sin seleccionar un horario.

Resultado esperado: El sistema muestra un mensaje indicando que se debe seleccionar un horario disponible.

Resultado obtenido: Correcto.