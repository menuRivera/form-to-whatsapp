<template>
  <div v-for="pedido, index in pedidos" :key="index">
    <p>{{pedido.cliente.nombre}}</p>
  </div>
</template>

<script>
export default {
  name: "lista",
  setup(props) {
    const { pedidos } = props;
    // // Armar la orden
    // lista.value.push(JSON.parse(JSON.stringify(pedido)));
    // var entrega = `*PEDIDO PARA: ${cliente.nombre.toUpperCase()}*\n  Teléfono: ${
    //   cliente.numero
    // }\n  Domicilio: ${cliente.domicilio}\n  Referencias: \n${
    //   cliente.referencias
    // }\n`;
    // var recoleccionString = `*RECOLECCIÓN: ${recoleccion.nombre}*\n  Domicilio: ${recoleccion.domicilio}\n  Referencias: \n${recoleccion.referencias}\n  Orden: \n${recoleccion.orden}\n  Indicaciones especiales: ${recoleccion.indicacionesEspeciales}\n`;
    // var totalEnvio = `*COSTO DE ENVÍO: $${costo.value}*`;
    // var orden = `${entrega}\n${recoleccionString}\n${totalEnvio}`;
    // // redirigir al usuario al link
    // const ordenUrl = `https://api.whatsapp.com/send/?phone=52${
    //   rep.value.telefono
    // }&text=${encodeURIComponent(orden)}&app_absent=0`;
    // window.open(ordenUrl, "https://web.whatsapp.com/");

    return {
      pedidos,
    };
  },
};
</script>

<style>
</style>