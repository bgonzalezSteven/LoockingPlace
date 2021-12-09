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
                {{ tr.description }}
              </vs-td>
              <vs-td class="justify-center items-center">
                <div class="con-content">
                  <div class="row items-center">
                    <vs-button
                      v-for="action in tr.actions"
                      :key="action.icon"
                      :class="`bg-${action.color}`"
                      @click="redirect(action.to, action.icon, tr._id)"
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
    </div>
  </q-page>
</template>
<script>
export default {
  mounted() {
    this.$emit("setTittle", "Roles del Sistema");
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
          tittle: "Nombre",
        },
        {
          tittle: "Descripción",
        },
        {
          tittle: "Acciones",
        },
      ],
      ruta: "rol",
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
    async redirect(to, icon, id) {
      if (icon == "edit") {
        this.$router.push(to);
      } else {
        this.dialog = true;
        this.id = id;
      }
    },
    async deleteItem() {
      this.$q.loading.show();
      this.$api.delete(`role/${this.id}`).then((res) => {
        this.$q.loading.hide();
        this.dialog = false
        this.id = ''
      });
    },
  },
};
</script>
