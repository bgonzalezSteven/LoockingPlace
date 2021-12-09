<template>
  <q-page class="q-pa-sm">
    <div>
      <div style="float: right">
        <vs-button
          class="bg-accent text-black"
          circle
          :to="`/${this.ruta}/agg_${this.ruta}`"
        >
          Nuevo
        </vs-button>
      </div>
      <div class="center">
        <vs-table dark>
          <template #header>
            <vs-input v-model="search" border placeholder="Search" />
          </template>
          <template slot="thead">
            <vs-tr>
              <vs-th v-for="tr in tittle" :key="tr.name">
                {{ tr.tittle }}
              </vs-th>
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
              <vs-td>
                {{ tr.name }}
              </vs-td>
              <vs-td>
                {{ tr.status }}
              </vs-td>
              <vs-td>
                {{ tr.direction }}
              </vs-td>
              <vs-td class="justify-center items-center">
                <div class="con-content">
                  <div class="row items-center">
                    <vs-button
                      v-for="action in tr.actions"
                      :key="action.icon"
                      :class="`bg-${action.color}`"
                      @click="redirect(action.to, action.icon, tr._id, tr)"
                      v-show="tr.slug !== 'app.everyAll'"
                    >
                      <q-icon :name="action.icon" />
                      <q-tooltip
                        :content-class="`bg-${action.color} shadow-4`"
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
      <vs-dialog width="550px" v-model="dialog">
        <template #header>
          <p class="text-bold">Atención</p>
        </template>
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
      <vs-dialog width="550px" v-model="dialogUser">
        <template #header>
          <p class="text-bold">Cambio de Estatus</p>
        </template>
        <div class="con-content text-center">
          <p class="text-bold text-italic">
            ¿Deseas cambiar el Estatus de {{ infoUser.name }}?
          </p>
        </div>
        <template #footer>
          <div class="row item-center">
            <vs-button
              :class="`${
                infoUser.status == 'Activar' ? 'bg-positive' : 'bg-negative'
              }`"
              @click="changeStatus"
              >{{ infoUser.status }}</vs-button
            >
            <vs-button @click="dialog = false">Cancelar</vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </q-page>
</template>
<script>
export default {
  mounted() {
    this.$emit("setTittle", "Hoteles");
    this.infoSolicity();
  },
  data() {
    return {
      date: [],
      page: 1,
      max: 7,
      dialog: false,
      id: "",
      search: "",
      tittle: [
        {
          tittle: "Hotel",
        },
        {
          tittle: "Estatus",
        },
        {
          tittle: "Dirección",
        },
        {
          tittle: "Acciones",
        },
      ],
      ruta: "hotels",
      infoUser: {},
      dialogUser: false,
    };
  },
  methods: {
    async infoSolicity() {
      this.$q.loading.show();
      await this.$api.get(`${this.ruta}`).then((res) => {
        this.date = res;
        this.$q.loading.hide();
      });
    },
    async redirect(to, icon, id, info) {
      if (icon == "edit") {
        this.$router.push(to);
      } else if (icon == "delete") {
        this.dialog = true;
        this.id = id;
      } else if (icon == "people") {
        this.infoUser = {
          _id: id,
          name: info.name,
          status: `${info.status == "Activo" ? "Desactivar" : "Activar"}`,
          email: info.email,
        };
        this.dialogUser = true;
      }
    },
    async deleteItem() {
      this.$q.loading.show();
      this.$api.delete(`hotels/${this.id}`).then((res) => {
        this.$q.loading.hide();
        this.dialog = false;
        this.id = "";
        this.infoSolicity();
      });
    },
    async changeStatus() {
      this.$q.loading.show();
      this.$api.put("changeStatus", this.infoUser).then((res) => {
        this.dialogUser = false;
        this.$q.loading.hide();
        this.infoSolicity();
      });
    },
  },
};
</script>
