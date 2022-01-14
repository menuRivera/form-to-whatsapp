<template>
  <h1 class="mt-5 ms-5">Pidencio / levantar pedido</h1>
  <div class="ms-5 mb-5 me-5">
    <form class="d-flex justify-content-evenly" @submit.prevent="agregarOrdenALista">

      <div class="flex-grow-1">
        <!-- NOTE: recolecciones -->
        <button class="btn btn-warning" v-on:click.prevent="agregarRecoleccion">Agregar recolección</button>
        <div class="mt-3" v-for="recoleccion, index in pedido.recolecciones" :key="index">
          <h3>Datos del pedido <strong>(Recolección {{index + 1}})</strong></h3>
          <button v-if="index > 0" class="btn btn-danger" v-on:click.prevent="eliminarRecoleccion(index)">Eliminar esta recoleccion</button>
          <div>
            <label :for="`recoleccion${index}-nombre`">Nombre del destino:</label>
            <input type="text" :id="`recoleccion${index}-nombre`" class="d-block" v-model="pedido.recolecciones[index].nombre" placeholder="EJ. nombre del restaurante" required>
          </div>

          <div>
            <label for="orden">Orden:</label>
            <textarea id="orden" class="d-block" v-model="pedido.recolecciones[index].orden" required> </textarea>
          </div>

          <div>
            <label :for="`recoleccion${index}-domicilio`">Domicilio:</label>
            <input type="text" :id="`recoleccion${index}-domicilio`" class="d-block" v-model="pedido.recolecciones[index].domicilio" placeholder="Calle, número y colonia" required>
          </div>

          <div>
            <label :for="`recoleccion${index}-referencias`">Referencias del domicilio:</label>
            <textarea :id="`recoleccion${index}-referencias`" class="d-block" v-model="pedido.recolecciones[index].referencias" placeholder="Cruce, fachada, ubicación aprox" required> </textarea>
          </div>

          <div>
            <label :for="`recoleccion${index}-indicaciones`">Indicaciones especiales del recoleccion:</label>
            <textarea :id="`recoleccion${index}-indicaciones`" class="d-block" v-model="pedido.recolecciones[index].indicacionesEspeciales" required> </textarea>
          </div>
        </div>
      </div>

      <div class="flex-grow-1">
        <div class="mt-3">
          <!-- NOTE: cliente -->
          <h3>Datos del cliente <strong>(Entrega)</strong></h3>
          <div>
            <label for="nombre">Nombre del cliente:</label>
            <input type="text" id="nombre" class="d-block" v-model="pedido.entrega.nombre" required>
          </div>

          <div>
            <label for="numero">Télefono:</label>
            <input type="number" id="numero" class="d-block" v-model="pedido.entrega.numero" required>
          </div>

          <div>
            <label for="domicilio">Domicilio:</label>
            <input type="text" id="domicilio" class="d-block" v-model="pedido.entrega.domicilio" placeholder="Calle, número y colonia" required>
          </div>

          <div>
            <label for="referencias">Referencias del domicilio:</label>
            <textarea id="referencias" class="d-block" v-model="pedido.entrega.referencias" placeholder="Cruce, fachada, ubicación aprox" required> </textarea>
          </div>
        </div>

        <div class="mt-3">
          <!-- NOTE: Costo de envío -->
          <h3>Costo de envío:</h3>
          <div>
            <label for="costo">Total:</label>
            <input type="number" class="d-block" id="costo" v-model="pedido.costo" required>
          </div>
        </div>

        <!-- <div class="mt-3">
          <h3>Asignar al repartidor:</h3>

          <div v-for="repartidor, index, in repartidores" :key="index">
            <input type="radio" :id="`${repartidor.telefono}-${index}`" class="me-2" :value="repartidor" v-model="rep">
            <label :for="`${repartidor.telefono}-${index}`">{{repartidor.nombre}}</label>
          </div>
        </div> -->

        <div class="mt-3">
          <!-- NOTE: Ordenar -->
          <button type="submit" class="btn btn-primary p-3">Agregar orden a lista de espera</button>
        </div>
      </div>

      <div id="lista-espera" class="flex-grow-1 ps-3">
        <!-- NOTE: Lista de espera -->
        <h3>Lista de espera</h3>
        <div v-for="pedidoListo, index in lista" :key="index" class="bg-grey p-2 rounded mb-4">
          <p>Para: <strong>{{pedidoListo.entrega.nombre}}</strong></p>
          <p>Costo de envio: <strong>${{pedidoListo.costo}}</strong></p>
          <p>Recolecciones:</p>
          <div class="ms-4">
            <div v-for="recoleccion, index2 in pedidoListo.recolecciones" :key="index2">
              <p>{{index2 + 1}}: <strong>{{recoleccion.nombre}}</strong></p>
            </div>
          </div>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import { repartidores } from "./util/repartidores";
import { recoleccionSchema } from "./util/recoleccionSchema";
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "App",
  setup() {
    // Setup state
    var lista = ref([]);
    const pedido = reactive({
      entrega: {
        nombre: "",
        numero: undefined,
        domicilio: "",
        referencias: "",
      },
      recolecciones: [
        {
          ...recoleccionSchema,
        },
      ],
      costo: 38,
    });

    // Setup local storage
    const rawLista = JSON.parse(localStorage.getItem("lista"));
    if (!rawLista) {
      // set default values to lista
      console.log("Configurando local storage");
      localStorage.setItem("lista", JSON.stringify([]));
    }
    lista.value = JSON.parse(localStorage.getItem("lista"));
    console.log("Lista de pedidos:", lista.value);

    // Functions
    const agregarRecoleccion = () => {
      pedido.recolecciones.push({ ...recoleccionSchema });
    };

    const eliminarRecoleccion = (index) => {
      pedido.recolecciones.splice(index, 1);
    };

    const agregarOrdenALista = () => {
      // Agregar el pedido a la lista
      lista.value.push(pedido);

      // Guardar la lista en el localStorage
      localStorage.setItem("lista", JSON.stringify(lista.value));

      // // limpiar las forms
    };

    // Return to bind 'em
    return {
      pedido,
      agregarRecoleccion,
      eliminarRecoleccion,
      agregarOrdenALista,
      repartidores,
      lista,
    };
  },
};
</script>

<style>
p {
  margin: 0;
}
#lista-espera {
  border-left: 1px solid rgb(126, 126, 126);
}
.bg-grey {
  background-color: rgb(219, 219, 219);
}
</style>
