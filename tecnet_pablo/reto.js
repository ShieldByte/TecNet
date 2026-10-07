/*
 * Reto: Calculadora de subredes IPv4
 * Integrante: Alejos Macias Pablo Alexander
 *
 * Una dirección IPv4 son 32 bits. Aquí se guarda como un número entero sin
 * signo (0 a 4,294,967,295) para poder calcular la red y el broadcast con
 * operaciones a nivel de bits (AND, OR, NOT).
 *
 * Nota: en JavaScript los operadores de bits trabajan con enteros de 32 bits
 * CON signo; por eso al final de cada operación se usa ">>> 0", que convierte
 * el resultado de vuelta a entero sin signo.
 */

const MAX_SUBREDES_LISTADAS = 64;

/* ---------------------------------------------------------------
 *  1. Conversión entre texto y número
 * --------------------------------------------------------------- */

// 3232235786 -> "192.168.1.10"
function ipATexto(numero) {
    return [
        (numero >>> 24) & 255,
        (numero >>> 16) & 255,
        (numero >>> 8) & 255,
        numero & 255
    ].join(".");
}

// "192.168.1.10" -> 3232235786.  Lanza un error si el texto no es una IP válida.
function textoAIp(texto) {
    const limpio = texto.trim();
    const octetos = limpio.split(".");

    if (octetos.length !== 4) {
        throw new Error("La IP debe tener 4 octetos separados por punto (ej. 192.168.1.10).");
    }

    let numero = 0;
    for (let i = 0; i < 4; i++) {
        const octeto = octetos[i];

        // Solo dígitos, de 1 a 3, sin ceros a la izquierda ("010" es ambiguo).
        if (!/^\d{1,3}$/.test(octeto) || (octeto.length > 1 && octeto[0] === "0")) {
            throw new Error(`El octeto ${i + 1} ("${octeto}") no es un número válido.`);
        }

        const valor = Number(octeto);
        if (valor > 255) {
            throw new Error(`El octeto ${i + 1} vale ${valor}; el máximo es 255.`);
        }

        numero = numero * 256 + valor;
    }
    return numero;
}

/* ---------------------------------------------------------------
 *  2. Máscara: prefijo (/24) <-> máscara decimal (255.255.255.0)
 * --------------------------------------------------------------- */

function prefijoAMascara(prefijo) {
    // /0 es un caso especial: desplazar 32 posiciones no hace nada en JS.
    return prefijo === 0 ? 0 : (0xFFFFFFFF << (32 - prefijo)) >>> 0;
}

function mascaraAPrefijo(mascara) {
    const binario = mascara.toString(2).padStart(32, "0");

    // Una máscara válida son unos seguidos de ceros: 111...1000...0
    if (!/^1*0*$/.test(binario)) {
        throw new Error("La máscara no es válida: sus bits 1 deben ir juntos al inicio (ej. 255.255.255.0).");
    }
    return binario.indexOf("0") === -1 ? 32 : binario.indexOf("0");
}

// Acepta "24", "/24" o "255.255.255.0" y devuelve el prefijo (0-32).
function interpretarMascara(texto) {
    const limpio = texto.trim().replace(/^\//, "");

    if (limpio === "") {
        throw new Error("Escribe la máscara como prefijo (/24) o en decimal (255.255.255.0).");
    }

    if (/^\d{1,2}$/.test(limpio)) {
        const prefijo = Number(limpio);
        if (prefijo > 32) {
            throw new Error("El prefijo debe estar entre /0 y /32.");
        }
        return prefijo;
    }

    if (limpio.includes(".")) {
        return mascaraAPrefijo(textoAIp(limpio));
    }

    throw new Error("Formato de máscara no reconocido. Usa /24 o 255.255.255.0.");
}

// Permite escribir todo junto en el campo de IP: "192.168.1.10/24"
function separarEntrada(textoIp, textoMascara) {
    if (textoIp.includes("/")) {
        const [ip, prefijo] = textoIp.split("/");
        return { ip, mascara: prefijo };
    }
    return { ip: textoIp, mascara: textoMascara };
}

/* ---------------------------------------------------------------
 *  3. Clasificación de la dirección
 * --------------------------------------------------------------- */

function claseDeIp(ip) {
    const primerOcteto = ip >>> 24;
    if (primerOcteto < 128) return "A";
    if (primerOcteto < 192) return "B";
    if (primerOcteto < 224) return "C";
    if (primerOcteto < 240) return "D (multicast)";
    return "E (experimental)";
}

// Rangos especiales: [dirección de inicio, prefijo, descripción]
const RANGOS_ESPECIALES = [
    ["10.0.0.0", 8, "Privada (RFC 1918)"],
    ["172.16.0.0", 12, "Privada (RFC 1918)"],
    ["192.168.0.0", 16, "Privada (RFC 1918)"],
    ["127.0.0.0", 8, "Loopback"],
    ["169.254.0.0", 16, "Link-local (APIPA)"],
    ["100.64.0.0", 10, "CGNAT (compartida)"],
    ["0.0.0.0", 8, "Red \"esta red\""],
    ["224.0.0.0", 4, "Multicast"],
    ["240.0.0.0", 4, "Reservada"]
];

function tipoDeIp(ip) {
    const encontrado = RANGOS_ESPECIALES.find(([inicio, prefijo]) => {
        const mascara = prefijoAMascara(prefijo);
        return ((ip & mascara) >>> 0) === textoAIp(inicio);
    });
    return encontrado ? encontrado[2] : "Pública";
}

/* ---------------------------------------------------------------
 *  4. Cálculo principal
 * --------------------------------------------------------------- */

function calcularSubred(textoIp, textoMascara) {
    const entrada = separarEntrada(textoIp, textoMascara);
    const ip = textoAIp(entrada.ip);
    const prefijo = interpretarMascara(entrada.mascara);

    const mascara = prefijoAMascara(prefijo);
    const wildcard = (~mascara) >>> 0;
    const red = (ip & mascara) >>> 0;
    const broadcast = (red | wildcard) >>> 0;
    const totalDirecciones = 2 ** (32 - prefijo);

    let primerHost;
    let ultimoHost;
    let hostsUtiles;
    let nota = "";

    if (prefijo === 32) {
        // Una sola dirección: identifica a un host (ej. una ruta a un servidor).
        primerHost = red;
        ultimoHost = red;
        hostsUtiles = 1;
        nota = "/32 identifica a un solo host; no tiene red ni broadcast separados.";
    } else if (prefijo === 31) {
        // RFC 3021: enlaces punto a punto, ambas direcciones se usan.
        primerHost = red;
        ultimoHost = broadcast;
        hostsUtiles = 2;
        nota = "/31 se usa en enlaces punto a punto (RFC 3021): las 2 direcciones son utilizables.";
    } else {
        primerHost = red + 1;
        ultimoHost = broadcast - 1;
        hostsUtiles = totalDirecciones - 2;
    }

    return {
        ip: ipATexto(ip),
        prefijo,
        mascara: ipATexto(mascara),
        wildcard: ipATexto(wildcard),
        red: ipATexto(red),
        broadcast: ipATexto(broadcast),
        primerHost: ipATexto(primerHost),
        ultimoHost: ipATexto(ultimoHost),
        totalDirecciones,
        hostsUtiles,
        clase: claseDeIp(ip),
        tipo: tipoDeIp(ip),
        ipBinaria: aBinarioConPuntos(ip),
        mascaraBinaria: aBinarioConPuntos(mascara),
        nota
    };
}

function aBinarioConPuntos(numero) {
    return numero.toString(2).padStart(32, "0").match(/.{8}/g).join(".");
}

/* ---------------------------------------------------------------
 *  5. Subdividir una red en subredes iguales
 * --------------------------------------------------------------- */

function subdividir(textoRed, prefijoActual, prefijoNuevo) {
    if (prefijoNuevo <= prefijoActual) {
        throw new Error(`El nuevo prefijo debe ser mayor que /${prefijoActual}.`);
    }
    if (prefijoNuevo > 30) {
        throw new Error("Para subdividir usa un prefijo de /30 o menor (las subredes deben tener hosts).");
    }

    const red = textoAIp(textoRed);
    const cantidad = 2 ** (prefijoNuevo - prefijoActual);
    const tamano = 2 ** (32 - prefijoNuevo);
    const subredes = [];

    for (let i = 0; i < Math.min(cantidad, MAX_SUBREDES_LISTADAS); i++) {
        const inicio = red + i * tamano;
        const fin = inicio + tamano - 1;
        subredes.push({
            numero: i + 1,
            red: `${ipATexto(inicio)}/${prefijoNuevo}`,
            rango: `${ipATexto(inicio + 1)} – ${ipATexto(fin - 1)}`,
            broadcast: ipATexto(fin)
        });
    }

    return { cantidad, hostsPorSubred: tamano - 2, subredes };
}

/* ---------------------------------------------------------------
 *  6. Interfaz (solo se ejecuta en el navegador)
 * --------------------------------------------------------------- */

if (typeof document !== "undefined") {
    const inputIp = document.getElementById("ip");
    const inputMascara = document.getElementById("mascara");
    const formulario = document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");
    const panelResultado = document.getElementById("resultado");
    const panelSubdividir = document.getElementById("subdividir");
    const selectPrefijo = document.getElementById("nuevoPrefijo");
    const tablaSubredes = document.getElementById("tablaSubredes");
    const resumenSubredes = document.getElementById("resumenSubredes");

    let ultimoCalculo = null;

    function mostrarMensaje(texto, tipo) {
        mensaje.textContent = texto;
        mensaje.className = tipo ? `mensaje ${tipo}` : "mensaje";
    }

    function pintarDato(id, valor) {
        document.getElementById(id).textContent = valor;
    }

    // Colorea los bits de red y de host en la vista binaria.
    function pintarBinario(id, binario, prefijo) {
        const contenedor = document.getElementById(id);
        contenedor.innerHTML = "";
        let bitsContados = 0;

        for (const caracter of binario) {
            const span = document.createElement("span");
            span.textContent = caracter;
            if (caracter !== ".") {
                span.className = bitsContados < prefijo ? "bit-red" : "bit-host";
                bitsContados++;
            }
            contenedor.appendChild(span);
        }
    }

    function llenarOpcionesSubdividir(prefijo) {
        selectPrefijo.innerHTML = "";
        for (let p = prefijo + 1; p <= Math.min(prefijo + 8, 30); p++) {
            const opcion = document.createElement("option");
            opcion.value = p;
            opcion.textContent = `/${p}  →  ${(2 ** (p - prefijo)).toLocaleString("es-MX")} subredes de ${(2 ** (32 - p) - 2).toLocaleString("es-MX")} hosts`;
            selectPrefijo.appendChild(opcion);
        }
        panelSubdividir.hidden = selectPrefijo.options.length === 0;
    }

    function mostrarSubredes() {
        tablaSubredes.innerHTML = "";
        resumenSubredes.textContent = "";
        if (!ultimoCalculo || selectPrefijo.value === "") return;

        const { cantidad, hostsPorSubred, subredes } = subdividir(
            ultimoCalculo.red,
            ultimoCalculo.prefijo,
            Number(selectPrefijo.value)
        );

        subredes.forEach(s => {
            const fila = document.createElement("tr");
            [s.numero, s.red, s.rango, s.broadcast].forEach(valor => {
                const celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);
            });
            tablaSubredes.appendChild(fila);
        });

        resumenSubredes.textContent =
            `${cantidad.toLocaleString("es-MX")} subredes de ${hostsPorSubred.toLocaleString("es-MX")} hosts cada una` +
            (cantidad > MAX_SUBREDES_LISTADAS ? ` (se muestran las primeras ${MAX_SUBREDES_LISTADAS}).` : ".");
    }

    function calcular() {
        try {
            const r = calcularSubred(inputIp.value, inputMascara.value);
            ultimoCalculo = r;

            pintarDato("resIp", `${r.ip}/${r.prefijo}`);
            pintarDato("resRed", r.red);
            pintarDato("resBroadcast", r.broadcast);
            pintarDato("resMascara", `${r.mascara}  (/${r.prefijo})`);
            pintarDato("resWildcard", r.wildcard);
            pintarDato("resRango", `${r.primerHost}  –  ${r.ultimoHost}`);
            pintarDato("resHosts", r.hostsUtiles.toLocaleString("es-MX"));
            pintarDato("resTotal", r.totalDirecciones.toLocaleString("es-MX"));
            pintarDato("resClase", r.clase);
            pintarDato("resTipo", r.tipo);
            pintarBinario("binIp", r.ipBinaria, r.prefijo);
            pintarBinario("binMascara", r.mascaraBinaria, r.prefijo);

            panelResultado.hidden = false;
            mostrarMensaje(r.nota, r.nota ? "aviso" : "");
            llenarOpcionesSubdividir(r.prefijo);
            mostrarSubredes();
        } catch (error) {
            ultimoCalculo = null;
            panelResultado.hidden = true;
            panelSubdividir.hidden = true;
            mostrarMensaje(error.message, "error");
        }
    }

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        calcular();
    });

    selectPrefijo.addEventListener("change", mostrarSubredes);

    // Botones de ejemplo: cargan un caso y calculan en el momento.
    document.querySelectorAll("[data-ejemplo]").forEach(boton => {
        boton.addEventListener("click", () => {
            const [ip, mascara] = boton.dataset.ejemplo.split(" ");
            inputIp.value = ip;
            inputMascara.value = mascara;
            calcular();
        });
    });

    // Datos del reto tomados de ficha.js
    if (typeof fichaReto !== "undefined") {
        document.getElementById("pieReto").textContent =
            `${fichaReto.nombreReto} · ${fichaReto.integrantes.join(", ")} · Equipo ${fichaReto.equipo}`;
    }
}

/* Exporta las funciones para poder probarlas con Node (node pruebas.test.js). */
if (typeof module !== "undefined") {
    module.exports = { textoAIp, ipATexto, interpretarMascara, calcularSubred, subdividir };
}
