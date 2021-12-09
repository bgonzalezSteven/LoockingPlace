<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="row items-center justify-center">
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-5 col-md-4 col-xl-3"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model="form.name"
            label="Nombre"
            :error="$v.form.name.$error"
            error-message="Dato necesario"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-5 col-md-4 col-xl-3"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model="form.rif"
            label="Rif"
            mask="A-#############"
            :error="$v.form.rif.$error"
            error-message="Dato necesario"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-5 col-md-4 col-xl-3"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model="form.direction"
            label="Direción"
            :error="$v.form.direction.$error"
            error-message="Dato necesario"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-5 col-md-4 col-xl-3"
        >
          <q-input
            disable
            dense
            rounded
            outlined
            lazy-rules
            v-model="form.email"
            label="Email"
            :error="$v.form.email.$error"
            error-message="Dato necesario / Ingrese un Email"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-9 col-sm-3 col-md-2 col-xl-1"
        >
          <q-input
            dense
            rounded
            outlined
            lazy-rules
            v-model.number="form.countHabitations"
            label="Cantidad de Habitaciones"
            :error="$v.form.countHabitations.$error"
            error-message="Dato necesario"
            type="number"
          />
        </div>
        <!---<div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-9 col-sm-3 col-md-2 col-xl-1"
        >
          <q-select
            transition-show="flip-up"
            transition-hide="flip-down"
            dense
            emit-value
            map-options
            rounded
            outlined
            lazy-rules
            v-model="form.unitedCount"
            label="Unidad de Conteo"
            :error="$v.form.unitedCount.$error"
            error-message="Dato necesario"
            :options="options"
          />
        </div>--->
      </div>
      <vs-button block style="margin: 1px; font-size: 11pt" @click="save"
        >Enviar
        <q-icon name="send" style="margin-left: 4px" />
      </vs-button>
    </div>
  </q-page>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      direction: {
        required,
      },
      email: {
        required,
      },
      name: {
        required,
      },
      rif: {
        required,
      },
      countHabitations: {
        required,
      },
      /*unitedCount: {
        required,
      },*/
    },
  },
  data() {
    return {
      id: "",
      form: {},
      options: [
        {
          label: 'Rango',
          value: 'range'
        },
        {
          label: 'Uno por uno',
          value: 'one'
        }
      ]
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
        this.$api.post("hotels", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    async getInfo() {
      this.$q.loading.show();
      this.$api.get("getInfo").then((res) => {
        (this.form = res), this.$q.loading.hide();
      });
    },
  },
  mounted() {
    this.$emit("setTittle", "Información del Hotel");
    this.getInfo();
  },
};
</script>
  
