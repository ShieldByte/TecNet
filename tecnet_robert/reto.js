function cadMinima(muestra, palabra) {
    if (!muestra || !palabra || muestra.length > palabra.length) {
        return "";
    }

    // contar frecuencia de caracteres en la muestra
    const mapaMuestra = {};
    for (let char of muestra) {
        mapaMuestra[char] = (mapaMuestra[char] || 0) + 1;
    }

    let caracteresRequeridos = Object.keys(mapaMuestra).length;
    let caracteresFormados = 0;

    // llevar el conteo con un mapa
    const mapaVentana = {};

    let inicioVentana = 0;
    let lonMinima = Infinity;
    let subcadenaMinima = "";

    for (let finVentana = 0; finVentana < palabra.length; finVentana++) {
        let charDerecha = palabra[finVentana];
        mapaVentana[charDerecha] = (mapaVentana[charDerecha] || 0) + 1;

        // si el caracter actual coincide en cantidad necesaria con la muestra
        if (mapaMuestra[charDerecha] && mapaVentana[charDerecha] === mapaMuestra[charDerecha]) {
            caracteresFormados++;
        }
        while (caracteresFormados === caracteresRequeridos) {
            let tamVentanaActual = finVentana - inicioVentana + 1;
            if (tamVentanaActual < lonMinima) {
                lonMinima = tamVentanaActual;
                subcadenaMinima = palabra.substring(inicioVentana, finVentana + 1);
            }

            // reducir la ventana quitando el elemento de la izquierda
            let charIzquierda = palabra[inicioVentana];
            mapaVentana[charIzquierda]--;

            if (mapaMuestra[charIzquierda] && mapaVentana[charIzquierda] < mapaMuestra[charIzquierda]) {
                caracteresFormados--;
            }

            inicioVentana++;
        }
    }

    return subcadenaMinima;
}

// ejemplos
console.log(cadMinima('nasa', 'antesala')); // Salida: 'antesa'
console.log(cadMinima('nesa', 'antesala')); // Salida: 'antes'