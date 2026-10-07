# Pruebas - Calculadora de subredes IPv4

**Integrante:** Alejos Macias Pablo Alexander
**Rama:** `tecnet_pablo`

## Descripción

Se realizaron cinco pruebas funcionales para verificar el cálculo de la red,
el broadcast y el rango de hosts, la validación de datos incorrectos, los
casos especiales de máscara y la división en subredes.

Los resultados esperados se comprobaron también contra el módulo `ipaddress`
de Python con 2,000 combinaciones aleatorias de IP y prefijo (de /0 a /30),
sin encontrar diferencias.

---

## Prueba 1 - Red clase C con prefijo /24

### Objetivo
Comprobar el cálculo básico con una red doméstica típica.

### Datos de entrada
- IP: `192.168.1.10`
- Máscara: `/24`

### Resultado esperado
| Campo | Valor |
|---|---|
| Red | 192.168.1.0 |
| Broadcast | 192.168.1.255 |
| Rango de hosts | 192.168.1.1 – 192.168.1.254 |
| Hosts utilizables | 254 |
| Máscara / Wildcard | 255.255.255.0 / 0.0.0.255 |
| Clase / Tipo | C / Privada (RFC 1918) |

### Resultado obtenido
Los valores coinciden con lo esperado.

### Estado
Prueba correcta

---

## Prueba 2 - Máscara decimal que no cae en límite de octeto

### Objetivo
Verificar que la máscara escrita en decimal se convierte correctamente y que
el cálculo funciona cuando la red "corta" a la mitad de un octeto.

### Datos de entrada
- IP: `172.16.45.130`
- Máscara: `255.255.240.0`

### Resultado esperado
| Campo | Valor |
|---|---|
| Prefijo | /20 |
| Red | 172.16.32.0 |
| Broadcast | 172.16.47.255 |
| Rango de hosts | 172.16.32.1 – 172.16.47.254 |
| Hosts utilizables | 4,094 |
| Wildcard | 0.0.15.255 |
| Clase | B |

### Resultado obtenido
Los valores coinciden. La vista binaria marca los primeros 20 bits como bits
de red.

### Estado
Prueba correcta

---

## Prueba 3 - Validación de datos incorrectos

### Objetivo
Comprobar que la calculadora no acepta datos inválidos y que el mensaje indica
el error exacto.

### Datos de entrada y mensaje obtenido
| IP | Máscara | Mensaje mostrado |
|---|---|---|
| `192.168.1.300` | `/24` | El octeto 4 vale 300; el máximo es 255. |
| `192.168.1` | `/24` | La IP debe tener 4 octetos separados por punto (ej. 192.168.1.10). |
| `192.168.01.1` | `/24` | El octeto 3 ("01") no es un número válido. |
| `192.168.1.1` | `/33` | El prefijo debe estar entre /0 y /32. |
| `192.168.1.1` | `255.0.255.0` | La máscara no es válida: sus bits 1 deben ir juntos al inicio (ej. 255.255.255.0). |
| `192.168.1.1` | *(vacío)* | Escribe la máscara como prefijo (/24) o en decimal (255.255.255.0). |

### Resultado esperado
No se muestran resultados y aparece el mensaje en rojo.

### Resultado obtenido
En los seis casos se ocultó el panel de resultados y se mostró el mensaje
correspondiente.

### Estado
Prueba correcta

---

## Prueba 4 - Casos especiales /30, /31 y /32

### Objetivo
Verificar los prefijos pequeños que se usan en enlaces entre routers y en
rutas a un solo equipo.

### Datos de entrada y resultado esperado
| Entrada | Red | Broadcast | Rango de hosts | Hosts |
|---|---|---|---|---|
| `200.33.150.7/30` | 200.33.150.4 | 200.33.150.7 | 200.33.150.5 – 200.33.150.6 | 2 |
| `10.1.1.1/31` | 10.1.1.0 | 10.1.1.1 | 10.1.1.0 – 10.1.1.1 | 2 |
| `8.8.8.8/32` | 8.8.8.8 | 8.8.8.8 | 8.8.8.8 – 8.8.8.8 | 1 |

### Resultado obtenido
Los valores coinciden. En /31 y /32 se muestra un aviso que explica el caso
(RFC 3021 para /31). La IP `200.33.150.7` se clasifica como **Pública**; además
se observa que es la dirección de broadcast de su red /30, por lo que no podría
asignarse a un equipo.

### Estado
Prueba correcta

---

## Prueba 5 - Dividir una red en subredes

### Objetivo
Comprobar la subdivisión de una red en subredes iguales.

### Datos de entrada
- IP: `192.168.1.10/24`
- Nuevo prefijo: `/26`

### Resultado esperado
4 subredes de 62 hosts cada una:

| # | Subred | Rango de hosts | Broadcast |
|---|---|---|---|
| 1 | 192.168.1.0/26 | 192.168.1.1 – 192.168.1.62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | 192.168.1.65 – 192.168.1.126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | 192.168.1.129 – 192.168.1.190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | 192.168.1.193 – 192.168.1.254 | 192.168.1.255 |

### Resultado obtenido
La tabla se generó con las 4 subredes correctas. Con una red más grande
(`10.0.0.0/8` dividida en `/16`) se calculan 256 subredes y la tabla muestra
solo las primeras 64, avisándolo en el resumen.

### Estado
Prueba correcta
