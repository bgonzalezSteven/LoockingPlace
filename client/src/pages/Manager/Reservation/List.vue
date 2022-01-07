<template>
  <q-page class="q-pa-sm" style="min-height: 400px">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="q-pa-sm">
        <div style="float: right">
          <vs-button class="bg-accent text-black" circle @click="band = true">
            Nueva
          </vs-button>
        </div>
        <div class="center">
          <vs-table dark>
            <template #header>
              <vs-input v-model="search" border placeholder="Search" />
            </template>
            <template slot="thead">
              <vs-tr>
                <vs-th>Tipo</vs-th>
                <vs-th>Acciones</vs-th>
              </vs-tr>
            </template>
            <template dense #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  $vs.getSearch(date, search),
                  page,
                  max
                )"
                :data="tr"
              >
                <vs-td>{{ tr.type }}</vs-td>
                <vs-td class="justify-center items-center">
                  <div class="con-content">
                    <div class="row items-center">
                      <vs-button
                        v-for="action in tr.actions"
                        :key="action.icon"
                        :class="`bg-${action.color}`"
                        @click="redirect(action.to, action.icon, tr._id)"
                      >
                        <q-icon :name="action.icon" />
                        <q-tooltip
                          :content-class="`bg-${action.color}  shadow-4`"
                          :offset="[10, 10]"
                        >
                          {{ action.title }}
                        </q-tooltip>
                      </vs-button>
                    </div>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                dark
                v-model="page"
                :length="$vs.getLength(date, max)"
              ></vs-pagination>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
    <vs-dialog width="550px" v-model="dialog">
      <template #header> Atención </template>
      <div class="con-content">
        <p>¿Esta seguro de eliminar el registro?</p>
      </div>
      <template #footer>
        <div class="row item-center">
          <vs-button danger @click="deleteItem">Ok</vs-button>
          <vs-button @click="dialog = false">Cancelar</vs-button>
        </div>
      </template>
    </vs-dialog>
    <q-dialog v-model="band" persistent>
      <q-card style="min-width: 380px;">
        <q-bar class="bg-secondary">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6 text-bold">Reservación</div>
        </q-card-section>

        <q-card-section>
          <Form/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import Form from "../Reservation/Form.vue";
export default {
  mounted() {
    // this.infoSolicity();
    this.$emit("setTittle", "Lista de Reservaciones");
  },
  components: {
    Form,
  },
  data() {
    return {
      date: [],
      page: 1,
      max: 7,
      dialog: false,
      id: "",
      search: "",
      ruta: "reservation",
      activeTooltip: false,
      band: false,
    };
  },
  methods: {
    async infoSolicity() {
      this.date = [];
      this.$q.loading.show();
      await this.$api.get(`${this.ruta}`).then((res) => {
        this.date = res;
        this.$q.loading.hide();
      });
    },
    async deleteItem() {
      this.$q.loading.show();
      await this.$api.delete(`${this.ruta}Id/` + this.id).then((res) => {
        console.log(res);
        this.$q.loading.hide();
        this.dialog = false;
      });
      this.infoSolicity();
    },
    async redirect(to, icon, id) {
      if (icon == "edit") {
        this.$router.push(to);
      } else {
        this.dialog = true;
        this.id = id;
      }
    },
  },
};
</script>
