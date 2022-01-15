<template>
  <div v-if="pedidoSeleccionado" class="pop-up bg-light rounded p-5 shadow d-flex">

    <div>
      <h4>Resumen del pedido</h4>
      <div>
        <h5>Entrega</h5>
        <div class="ps-3">
          <p>Nombre: {{pedidoSeleccionado.entrega.nombre}}</p>
          <p>Telefono: {{pedidoSeleccionado.entrega.numero}}</p>
          <p>Domicilio: {{pedidoSeleccionado.entrega.domicilio}}</p>
          <p>Referencias: {{pedidoSeleccionado.entrega.referencias}}</p>
        </div>
      </div>
      <div>
        <h5>Recolecciones</h5>
        <div class="ps-3" v-for="recoleccion, index in pedidoSeleccionado.recolecciones" :key="index">
          <p class="fw-bold">{{recoleccion.nombre}}</p>
          <div class="ps-3">
            <p>Orden: {{recoleccion.orden}}</p>
            <p>Domicilio: {{recoleccion.domicilio}}</p>
            <p>Referencias: {{recoleccion.referencias}}</p>
            <p>indicacionesEspeciales: {{recoleccion.indicacionesEspeciales}}</p>
          </div>
        </div>
      </div>
      <div>
        <h5>Costo de envio: ${{pedidoSeleccionado.costo}}</h5>
      </div>
    </div>

    <div class="ms-5">
      <div class="">
        <h4 class="fw-light">Asignar al repartidor para <strong class="fw-bold">{{pedidoSeleccionado.entrega.nombre}}</strong>:</h4>
        <div v-for="repartidor, index, in repartidores" :key="index">
          <input type="radio" :id="`${repartidor.telefono}-${index}`" class="me-2" :value="repartidor" v-model="rep">
          <label :for="`${repartidor.telefono}-${index}`">{{repartidor.nombre}}</label>
        </div>
      </div>
      <div class="mt-3 justify-content-between d-flex">
        <button class="btn btn-danger" v-on:click="cerrarPedido">Cancelar</button>
        <button class="btn btn-success" v-on:click="asignarPedido">Asignar</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    pedidoSeleccionado: {
      entrega: Object,
      recolecciones: Array,
      costo: Number,
    },
    index: Number
  },
  setup() {},
};
</script>

<style>
.pop-up {
  position: absolute;
  top: 100px;
  right: 30%;
}
</style>