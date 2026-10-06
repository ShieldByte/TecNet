# Pruebas - Gestor de calificaciones

## Descripción

Se realizaron cinco pruebas funcionales al Gestor de calificaciones con el objetivo
de verificar el registro de estudiantes, las validaciones de entrada, los filtros,
el cálculo del promedio y la eliminación de registros.

---

## Prueba 1 - Registro correcto de un estudiante

### Objetivo
Comprobar que el sistema permita registrar correctamente un estudiante cuando
los datos ingresados son válidos.

### Datos de entrada

- Nombre: Christian
- Calificación: 9.5

### Resultado esperado
El estudiante debe agregarse a la tabla con:

- Nombre: Christian
- Calificación: 9.5
- Estado: Aprobado

También debe actualizarse el total de estudiantes y el promedio general.

### Resultado obtenido
El estudiante se agregó correctamente y apareció en la tabla con estado
"Aprobado".

### Estado
Prueba correcta

---

## Prueba 2 - Validación de nombre vacío

### Objetivo
Comprobar que el sistema no permita registrar un estudiante sin nombre.

### Datos de entrada

- Nombre: vacío
- Calificación: 8

### Resultado esperado
El estudiante no debe agregarse a la tabla y debe mostrarse un mensaje indicando
que es necesario ingresar el nombre.

### Resultado obtenido
El registro fue rechazado y se mostró el mensaje: > Ingresa el nombre del estudiante.

### Estado
Prueba correcta

---

## Prueba 3 - Validación de calificación fuera de rango

### Objetivo
Comprobar que únicamente puedan registrarse calificaciones entre 0 y 10.

### Datos de entrada

- Nombre: Pablo
- Calificación: 11

### Resultado esperado
El estudiante no debe agregarse porque la calificación está fuera del rango
permitido.

El sistema debe mostrar un mensaje de validación.

### Resultado obtenido
El registro fue rechazado y se mostró el mensaje:

> La calificación debe estar entre 0 y 10.

### Estado
Prueba correcta

---

## Prueba 4 - Filtro de estudiantes reprobados

### Objetivo
Verificar que el filtro "Reprobados" muestre únicamente estudiantes con una
calificación menor a 6.

### Datos registrados

| Estudiante | Calificación | Estado |
|-------------|--------------|--------|
| Christian | 9.5 | Aprobado |
| Pablo | 7.0 | Aprobado |
| Robert | 4.5 | Reprobado |
| Omar | 5.0 | Reprobado |
| Paul | 10.0 | Aprobado |

### Acción realizada
Se seleccionó el botón:

> Reprobados

### Resultado esperado
La tabla debe mostrar únicamente:

- Robert - 4.5
- Omar - 5.0

### Resultado obtenido
El sistema mostró únicamente a los estudiantes cuya calificación era menor a 6.

### Estado
Prueba correcta

---

## Prueba 5 - Eliminación de estudiante y actualización del promedio

### Objetivo
Comprobar que al eliminar un estudiante también se actualice correctamente
el promedio general del grupo.

### Datos registrados

| Estudiante | Calificación |
|-------------|--------------|
| Christian | 9.5 |
| Pablo | 7.0 |
| Robert | 4.5 |

### Promedio inicial

(9.5 + 7.0 + 4.5) / 3 = 7.00

### Acción realizada
Se eliminó al estudiante Robert.

### Resultado esperado
Robert debe desaparecer de la tabla y el promedio debe calcularse nuevamente
utilizando únicamente los estudiantes restantes.

Nuevo promedio:

(9.5 + 7.0) / 2 = 8.25

### Resultado obtenido
Robert fue eliminado correctamente y el promedio cambió de 7.00 a 8.25.

### Estado
Prueba correcta

---

# Resultado general

Las cinco pruebas realizadas fueron satisfactorias.

El Gestor de calificaciones permite:

- Registrar estudiantes con datos válidos.
- Validar campos obligatorios.
- Evitar calificaciones fuera del rango de 0 a 10.
- Clasificar estudiantes como aprobados o reprobados.
- Filtrar los registros según su estado.
- Eliminar estudiantes.
- Recalcular automáticamente el promedio general.

Por lo tanto, las funcionalidades principales del reto se comportan de acuerdo
con lo esperado.

---

# Conflicto controlado de Git

Esta sección se completará posteriormente al realizar el conflicto controlado
solicitado en la práctica.