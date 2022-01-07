<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="row items-center justify-center">
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model="form.roomsType"
            label="Tipo"
            :error="$v.form.roomsType.$error"
            error-message="Dato necesario"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model.lazy="form.coste"
            label="Costo"
            :error="$v.form.coste.$error"
            error-message="Dato necesario"
            v-money="money"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-input
            type="number"
            dense
            rounded
            outlined
            lazy-rules
            v-model.number="form.capacity"
            label="Capacidad"
            :error="$v.form.capacity.$error"
            error-message="Dato necesario"
          />
        </div>
      </div>
    </div>
    <div class="row justify-center items-end">
      <vs-button @click="save" class="bg-primary" block>Enviar</vs-button>
    </div>
  </q-page>
</template>
<script>
import { VMoney } from "v-money";
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      roomsType: {
        required,
      },
      coste: {
        required,
      },
      capacity: {
        required,
      },
    },
  },
  data() {
    return {
      id: "",
      form: {},
      money: {
        decimal: ".",
        thousands: ".",
        // suffix: " #",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    };
  },
  directives: { money: VMoney },
  methods: {
    async save() {
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
        this.$q.loading.show();
        this.$api.post("roomTypes", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    async getInfo() {
      if (this.id) {
        this.$q.loading.show();
        this.$api.get(`getroomTypes/${this.id}`).then((res) => {
          this.$q.loading.hide();
          this.form = res;
        });
      }
    },
  },
  mounted() {
    this.$emit("setTittle", "Datos de Habitación");
    this.id = this.$route.params.id;
    this.getInfo();
  },
};
</script>