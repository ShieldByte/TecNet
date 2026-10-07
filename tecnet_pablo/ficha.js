const fichaReto = {

    nombreReto: "Calculadora de subredes IPv4",

    equipo: "TecNet",

    integrantes: [
        "Alejos Macias Pablo Alexander"
    ],

    origen: "Reto propio (no está en la página de AulaScript)",

    objetivo:
        "Desarrollar una herramienta web que, a partir de una dirección IPv4 y su " +
        "máscara, calcule la dirección de red, el broadcast, el rango de hosts " +
        "utilizables, la wildcard, la clase y el tipo de dirección, y que permita " +
        "dividir la red en subredes del mismo tamaño.",

    justificacion:
        "TecNet ofrece servicios de mantenimiento de equipos, redes y servidores. " +
        "Calcular subredes es una tarea diaria al configurar routers, VLANs o servidores, " +
        "y equivocarse en un rango provoca equipos sin conexión o direcciones duplicadas. " +
        "Además, el reto obliga a usar JavaScript de forma no trivial: operaciones a nivel " +
        "de bits, validación estricta de texto y generación dinámica de tablas en el DOM.",

    entradas: [
        "Dirección IP en formato decimal con puntos (ej. 192.168.1.10)",
        "Máscara como prefijo (/24 o 24) o en decimal (255.255.255.0)",
        "Opcional: IP y prefijo juntos en un solo campo (ej. 10.0.5.20/22)",
        "Opcional: nuevo prefijo para dividir la red en subredes"
    ],

    proceso: [
        "Validar que la IP tenga 4 octetos numéricos entre 0 y 255, sin ceros a la izquierda",
        "Validar que la máscara sea un prefijo entre /0 y /32 o una máscara decimal con bits contiguos",
        "Convertir la IP y la máscara a enteros de 32 bits",
        "Red = IP AND máscara;  Wildcard = NOT máscara;  Broadcast = Red OR wildcard",
        "Calcular primer y último host, total de direcciones y hosts utilizables",
        "Tratar los casos especiales /31 (punto a punto) y /32 (un solo host)",
        "Determinar la clase (A-E) y si la IP es privada, pública, loopback, etc.",
        "Si se elige un nuevo prefijo, generar la lista de subredes resultantes"
    ],

    salidas: [
        "Dirección de red y broadcast",
        "Rango de hosts utilizables y cantidad de hosts",
        "Máscara decimal, prefijo y wildcard",
        "Clase y tipo de dirección",
        "Vista en binario con los bits de red y de host en distinto color",
        "Tabla de subredes al subdividir",
        "Mensajes de error específicos cuando un dato es inválido"
    ],

    restricciones: [
        "Cada octeto debe estar entre 0 y 255",
        "La IP debe tener exactamente 4 octetos",
        "El prefijo debe estar entre /0 y /32",
        "Una máscara decimal solo es válida si sus bits en 1 van juntos al inicio",
        "Para subdividir, el nuevo prefijo debe ser mayor al actual y como máximo /30",
        "La tabla de subredes muestra como máximo 64 filas para no saturar la página"
    ],

    conceptosJavascript: [

        {
            concepto: "Operadores a nivel de bits (&, |, ~, <<, >>>)",

            descripcion:
                "Permiten trabajar directamente con los bits de un número entero.",

            uso:
                "En calcularSubred() se obtiene la red con (ip & mascara), la wildcard " +
                "con ~mascara y el broadcast con (red | wildcard). En prefijoAMascara() se " +
                "construye la máscara desplazando 0xFFFFFFFF hacia la izquierda. Se usa " +
                ">>> 0 para regresar a entero sin signo, porque JavaScript trata los " +
                "operadores de bits como enteros de 32 bits con signo."
        },

        {
            concepto: "Funciones y manejo de errores (throw / try...catch)",

            descripcion:
                "Las funciones dividen el problema en partes pequeñas y throw permite " +
                "detener el cálculo cuando un dato es inválido.",

            uso:
                "textoAIp(), interpretarMascara() y mascaraAPrefijo() lanzan un Error con " +
                "un mensaje específico. La función calcular() de la interfaz los atrapa " +
                "con try...catch y muestra el mensaje en pantalla."
        },

        {
            concepto: "Expresiones regulares y cadenas",

            descripcion:
                "Las expresiones regulares validan el formato de un texto.",

            uso:
                "/^\\d{1,3}$/ valida cada octeto; /^1*0*$/ comprueba que la máscara en " +
                "binario sea solo unos seguidos de ceros; /.{8}/g separa los 32 bits en " +
                "grupos de 8 para la vista binaria. También se usan split(), join(), " +
                "padStart() y toString(2)."
        },

        {
            concepto: "Arrays y métodos de arreglos",

            descripcion:
                "Los arreglos guardan listas de datos y métodos como find() o forEach() " +
                "los recorren.",

            uso:
                "RANGOS_ESPECIALES es un arreglo que se recorre con find() para saber si la " +
                "IP es privada, loopback, etc. subdividir() arma un arreglo de objetos con " +
                "cada subred y forEach() lo convierte en filas de la tabla."
        },

        {
            concepto: "Manipulación del DOM y eventos",

            descripcion:
                "JavaScript modifica la página y responde a las acciones del usuario.",

            uso:
                "Se usan getElementById(), createElement() y appendChild() para llenar " +
                "resultados y tablas; addEventListener('submit') para el formulario, " +
                "'change' para el selector de subredes y 'click' en los botones de " +
                "ejemplo (que leen su dato con dataset)."
        }

    ],

    resena:
        "La Calculadora de subredes IPv4 aplica JavaScript a un problema real de redes. " +
        "La parte central del reto es entender que una IP son 32 bits: al guardarla como " +
        "número entero, la red, el broadcast y la wildcard se obtienen con una sola " +
        "operación de bits cada una. Alrededor de ese núcleo se construyó una validación " +
        "estricta de la entrada con expresiones regulares y mensajes de error claros, una " +
        "vista binaria que muestra qué bits pertenecen a la red y cuáles al host, y una " +
        "función para dividir la red en subredes iguales, como se hace al planear VLSM.",

    conclusion: {
        decision:
            "Representar la IP como un entero de 32 bits en lugar de trabajar octeto por " +
            "octeto. Así el cálculo de red y broadcast se reduce a AND y OR, y funciona igual " +
            "para cualquier prefijo, incluso los que no caen en un límite de octeto (/22, /27).",

        dificultadResuelta:
            "Al calcular con prefijos como /0 o con IPs mayores a 128.0.0.0 aparecían números " +
            "negativos, porque los operadores de bits de JavaScript usan enteros con signo. " +
            "Se resolvió aplicando >>> 0 a cada resultado y tratando /0 aparte, ya que " +
            "desplazar 32 posiciones no tiene efecto en JavaScript.",

        limitacion:
            "Solo trabaja con IPv4. La subdivisión genera subredes del mismo tamaño " +
            "(no hace VLSM automático por número de hosts) y la tabla se limita a 64 filas.",

        aprendizajeGit:
            "Trabajar en la rama tecnet_pablo y solo dentro de la carpeta tecnet_pablo/ " +
            "permitió subir el reto sin tocar el proyecto principal ni el trabajo de los " +
            "compañeros. El conflicto controlado mostró cómo leer las marcas <<<<<<<, ======= " +
            "y >>>>>>> y decidir qué versión conservar antes de terminar el merge."
    },

    referencias: [
        "MDN Web Docs: operadores bit a bit y expresiones regulares en JavaScript",
        "RFC 1918: espacios de direcciones privadas",
        "RFC 3021: uso de prefijos /31 en enlaces punto a punto",
        "Material proporcionado por el docente para la práctica Git-JavaScript-retos"
    ],

    aportaciones: [
        {
            integrante: "Alejos Macias Pablo Alexander",

            aportacion:
                "Elección y análisis del reto, lógica de cálculo de subredes, validaciones, " +
                "subdivisión de redes, diseño de la interfaz, pruebas funcionales, conflicto " +
                "controlado de Git y documentación."
        }
    ]

};
