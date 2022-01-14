<template>
  <div v-for="pedido, index in pedidos" :key="index">
      <p>{{pedido.cliente.nombre}}</p>
  </div>
</template>

<script>
export default {
    name: "lista",
    setup(props) {
        const {pedidos} = props;

        return {
            pedidos
        }
    }

}
</script>

<style>

</style>