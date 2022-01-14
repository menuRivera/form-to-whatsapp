<template>
  <h1 class="mt-5 ms-5">Pidencio / levantar pedido</h1>
  <div class="ms-5 mb-5">
    <form class="d-flex justify-content-evenly" @submit="enviarOrden">

      <div class="flex-grow-1">
        <!-- TODO: Agregar la posibilidad de agregar más puntos de recolección -->
        <div class="mt-3">
          <!-- NOTE: recoleccion -->
          <h3>Datos del pedido <strong>(Recolección)</strong></h3>
          <div>
            <label for="recoleccion-nombre">Nombre del destino:</label>
            <input type="text" id="recoleccion-nombre" class="d-block" v-model="recoleccion.nombre" placeholder="EJ. nombre del restaurante" required>
          </div>

          <div>
            <label for="orden">Orden:</label>
            <textarea id="orden" class="d-block" v-model="recoleccion.orden" required> </textarea>
          </div>

          <div>
            <label for="recoleccion-domicilio">Domicilio:</label>
            <input type="text" id="recoleccion-domicilio" class="d-block" v-model="recoleccion.domicilio" placeholder="Calle, número y colonia" required>
          </div>

          <div>
            <label for="recoleccion-referencias">Referencias del domicilio:</label>
            <textarea id="recoleccion-referencias" class="d-block" v-model="recoleccion.referencias" placeholder="Cruce, fachada, ubicación aprox" required> </textarea>
          </div>

          <div>
            <label for="recoleccion-indicaciones">Indicaciones especiales del recoleccion:</label>
            <textarea id="recoleccion-indicaciones" class="d-block" v-model="recoleccion.indicacionesEspeciales" required> </textarea>
          </div>
        </div>
      </div>

      <div class="flex-grow-1">
        <div class="mt-3">
          <!-- NOTE: cliente -->
          <h3>Datos del cliente <strong>(Entrega)</strong></h3>
          <div>
            <label for="nombre">Nombre del cliente:</label>
            <input type="text" id="nombre" class="d-block" v-model="cliente.nombre" required>
          </div>

          <div>
            <label for="numero">Télefono:</label>
            <input type="number" id="numero" class="d-block" v-model="cliente.numero" required>
          </div>

          <div>
            <label for="domicilio">Domicilio:</label>
            <input type="text" id="domicilio" class="d-block" v-model="cliente.domicilio" placeholder="Calle, número y colonia" required>
          </div>

          <div>
            <label for="referencias">Referencias del domicilio:</label>
            <textarea id="referencias" class="d-block" v-model="cliente.referencias" placeholder="Cruce, fachada, ubicación aprox" required> </textarea>
          </div>
        </div>

        <div class="mt-3">
          <!-- NOTE: Costo de envío -->
          <h3>Costo de envío:</h3>
          <div>
            <label for="costo">Total:</label>
            <input type="number" class="d-block" id="costo" v-model="costo" required>
          </div>
        </div>

        <div class="mt-3">
          <!-- NOTE: repartidor -->
          <h3>Asignar al repartidor:</h3>

          <div v-for="repartidor, index, in repartidores" :key="index">
            <input type="radio" :id="`${repartidor.telefono}-${index}`" class="me-2" :value="repartidor" v-model="rep">
            <label :for="`${repartidor.telefono}-${index}`">{{repartidor.nombre}}</label>
          </div>
        </div>

        <!-- NOTE: Ordenar -->
        <div class="mt-3">
          <button v-if="rep" type="submit" class="btn btn-primary">Enviar orden a {{rep.nombre}}</button>
          <p v-else class="text-danger">Selecciona un repartidor para continuar</p>
        </div>
      </div>

      <div class="flex-grow-1">
        <h3>Lista de espera</h3>

      </div>

    </form>

  </div>
</template>

<script>
import { repartidores } from "./util/repartidores";
import "bootstrap/dist/css/bootstrap.css";
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "App",
  setup() {
    console.log(repartidores);
    const cliente = reactive({
      nombre: "",
      numero: undefined,
      domicilio: "",
      referencias: "",
    });

    const recoleccion = reactive({
      nombre: "",
      orden: "",
      domicilio: "",
      referencias: "",
      indicacionesEspeciales: "",
    });

    const rep = ref("");
    const costo = ref(38);

    const enviarOrden = () => {
      // Armar la orden
      var entrega = `*PEDIDO PARA: ${cliente.nombre.toUpperCase()}*\n  Teléfono: ${
        cliente.numero
      }\n  Domicilio: ${cliente.domicilio}\n  Referencias: \n${
        cliente.referencias
      }\n`;
      var recoleccionString = `*RECOLECCIÓN: ${recoleccion.nombre}*\n  Domicilio: ${recoleccion.domicilio}\n  Referencias: \n${recoleccion.referencias}\n  Orden: \n${recoleccion.orden}\n  Indicaciones especiales: ${recoleccion.indicacionesEspeciales}\n`;

      var totalEnvio = `*COSTO DE ENVÍO: $${costo.value}*`;

      var orden = `${entrega}\n${recoleccionString}\n${totalEnvio}`;

      // redirigir al usuario al link
      const ordenUrl = `https://api.whatsapp.com/send/?phone=52${
        rep.value.telefono
      }&text=${encodeURIComponent(orden)}&app_absent=0`;
      window.open(ordenUrl, "https://web.whatsapp.com/");

      // limpiar las forms
      cliente.nombre = "";
      cliente.numero = undefined;
      cliente.domicilio = "";
      cliente.referencias = "";
      recoleccion.nombre = "";
      recoleccion.orden = "";
      recoleccion.domicilio = "";
      recoleccion.referencias = "";
      recoleccion.indicacionesEspeciales = "";
      rep.value = "";
    };

    return {
      cliente,
      recoleccion,
      repartidores,
      rep,
      costo,
      enviarOrden,
    };
  },
};
</script>

<style>
.btn-primary {
  width: 300px;
  height: 70px;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
</style>
