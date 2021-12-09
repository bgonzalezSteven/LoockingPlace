<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="row items-center justify-center">
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-select
            dense
            rounded
            outlined
            v-model="form.range"
            multiple
            :options="range"
            use-chips
            label="Seleccione Habitaciones"
            :error="$v.form.range.$error"
            error-message="Dato necesario"
          />
        </div>

        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-select
            emit-value
            map-options
            dense
            rounded
            outlined
            v-model="form._idRoom"
            label="Tipo"
            :options="options"
            :error="$v.form._idRoom.$error"
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
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      range: {
        required,
      },
      _idRoom: {
        required,
      },
    },
  },
  data() {
    return {
      id: "",
      form: {},
      observator: {},
      options: [],
      range: [],
    };
  },
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
        this.$api.post("typesRoom", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    async getInfo() {
      this.$q.loading.show();
      this.$api.get(`getInfoCounter`).then((res) => {
        this.observator = res;
        this.options = this.observator.rooms;
        this.range = this.observator.counter;
        if (this.id) {
          this.$api.get(`getInfoRomm/${this.id}`).then((res) => {
            this.form = res;
          });
        }
        this.$q.loading.hide();
      });
    },
  },
  mounted() {
    this.$emit("setTittle", "Tipo de Habitación");
    this.id = this.$route.params.id;
    this.getInfo();
  },
};
</script>
