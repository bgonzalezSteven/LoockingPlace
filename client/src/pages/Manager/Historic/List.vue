<template>
  <q-page class="q-pa-sm" style="min-height: 400px">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="q-pa-sm">
        <div style="float: right">
          <vs-button class="bg-accent text-black" circle>
            Cambiar fechas
          </vs-button>
        </div>
        <div class="center">
          <vs-table dark>
            <template #header>
              <vs-input v-model="search" border placeholder="Search" />
            </template>
            <template slot="thead">
              <vs-tr>
                <vs-th>Hospedaje</vs-th>
                <vs-th>Fecha</vs-th>
                <vs-th>Metodo</vs-th>
                <vs-th>Costo</vs-th>
                <vs-th>Ref.</vs-th>
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
                <vs-td>{{ tr.rangeDate }}</vs-td>
                <vs-td>{{ tr.date }}</vs-td>
                <vs-td>{{ tr.methods }}</vs-td>
                <vs-td>{{ tr.coste }}</vs-td>
                <vs-td>{{ tr.ref }}</vs-td>
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
    <vs-dialog not-close blur prevent-close width="550px" v-model="dialog">
      <template #header>
        <div class="text-bold text-center">Rango de fechas</div>
      </template>
      <div class="con-content row items-center justify-center q-pa-md">
        <vs-input success type="date" v-model="form.entryDate" label="Inicio" />
        <vs-input success type="date" v-model="form.exitDate" label="Fin" />
      </div>
      <template #footer>
        <div class="row item-center justify-center">
          <vs-button danger @click="infoSolicity">Buscar</vs-button>
        </div>
      </template>
    </vs-dialog>
  </q-page>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      entryDate: {
        required,
      },
      exitDate: {
        required,
      },
    },
  },
  mounted() {
    // this.infoSolicity();
    this.$emit("setTittle", "Historicos de Pago");
  },
  data() {
    return {
      form: {},
      date: [],
      page: 1,
      max: 7,
      dialog: true,
      id: "",
      search: "",
      ruta: "historic",
      activeTooltip: false,
    };
  },
  methods: {
    async infoSolicity() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        if (this.$v.form.$error) {
          this.$vs.notification({
            title: "Alto ahi",
            text: "Formulario con errores",
            color: "danger",
            position: "bottom-center",
          });
        }
      } else {
        this.$api.post(`${this.ruta}`, this.form).then((res) => {
          if (res) {
            this.dialog = false;
            this.date = res;
          }
          this.$q.loading.hide();
        });
      }
    },
  },
};
</script>
