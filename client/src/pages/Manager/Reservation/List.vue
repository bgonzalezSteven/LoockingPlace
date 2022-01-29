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
          <vue-cal
            selected-date="2021-01-01"
            :time-from="9 * 60"
            :disable-views="['years', 'year']"
            active-view="month"
            hide-weekends
            events-on-month-view="short"
            :events="events"
            style="height: 600px"
          >
          </vue-cal>
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
      <q-card style="min-width: 380px">
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
          <Form />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import Form from "../Reservation/Form.vue";
import VueCal from "vue-cal";
export default {
  mounted() {
    this.infoSolicity();
    this.$emit("setTittle", "Lista de Reservaciones");
  },
  components: {
    Form,
    VueCal,
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
      messages: [],
      events: [],
    };
  },
  methods: {
    async infoSolicity() {
      this.events = [];
      this.$q.loading.show();
      await this.$api.get(`${this.ruta}`).then((res) => {
        this.events = res;
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
 
<style>
@import "../../../css/vuecal.css";
.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal__menu {
  background-color: #072d44;
}
.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
.vuecal--month-view .vuecal__no-event {
  display: none;
}

.vuecal__event.sport {
  background-color: rgba(232, 0, 0, 0.9);
  color: #000;
}
.vuecal__event.health {
  background-color: rgba(0, 252, 13, 0.9);
  color: #000;
}
.vuecal__event.business {
  background-color: rgba(17, 0, 255, 0.9);
  color: #fff;
}
.vuecal__event.leisure {
  background-color: rgba(255, 0, 179, 0.9);
  color: #000;
}
.vuecal__event--focus,
.vuecal__event:focus {
  box-shadow: 2px 2px 2px #000;
  transform: translateY(-3px);
  z-index: 3;
  outline: none;
}
</style>