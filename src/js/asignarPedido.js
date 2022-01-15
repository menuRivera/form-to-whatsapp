export const asignarPedido = (pedido, repartidor) => {
    pedido = JSON.parse(JSON.stringify(pedido))
    repartidor = JSON.parse(JSON.stringify(repartidor))
    const separador = '\n---------------------------------------------------------------\n\n'


    // Codificar el pedido
    var entrega = '';
    entrega += `PEDIDO PARA: *${pedido.entrega.nombre.toUpperCase()}*\n`
    entrega += `    Teléfono: ${pedido.entrega.numero}\n`
    entrega += `    Domicilio: ${pedido.entrega.domicilio}\n`
    entrega += `    Referencias: ${pedido.entrega.referencias}\n`;
    entrega += separador;



    var recoleccionString = '';

    for (const recoleccion of pedido.recolecciones) {
        recoleccionString += `    *${recoleccion.nombre.toUpperCase()}*\n`
        recoleccionString += `        Domicilio: ${recoleccion.domicilio}\n`
        recoleccionString += `        Referencias: ${recoleccion.referencias}\n`
        recoleccionString += `        Indicaciones especiales: ${recoleccion.indicacionesEspeciales}\n\n`;
        recoleccionString += `        Orden: \n${recoleccion.orden}\n`
        recoleccionString += separador;
    }

    var totalEnvio = `COSTO DE ENVÍO: *$${pedido.costo}*`;

    var orden = `${entrega}${recoleccionString}${totalEnvio}`;

    // Generar la url de whatsapp
    const ordenUrl = `https://api.whatsapp.com/send/?phone=52${repartidor.telefono}&text=${encodeURIComponent(orden)}&app_absent=0`;

    // redireccionar al usuario a esa url
    window.open(ordenUrl, "_blank");
}