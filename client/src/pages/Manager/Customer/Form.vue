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
            v-model="form.name"
            label="Nombres"
            :error="$v.form.name.$error"
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
            v-model="form.lastname"
            label="Apellidos"
            :error="$v.form.lastname.$error"
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
            v-model="form.phone"
            label="Telefono"
            :error="$v.form.phone.$error"
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
            v-model="form.dni"
            label="DNI"
            :error="$v.form.dni.$error"
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
            v-model="form.email"
            label="Email"
            placeholder="example@gmail.com"
            :error="$v.form.email.$error"
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
import { required, email } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      name: {
        required,
      },
      lastname: {
        required,
      },
      phone: {
        required,
      },
      dni: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  data() {
    return {
      id: "",
      form: {},
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
        this.$api.post("customer", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    async getInfo() {
      if (this.id) {
        this.$q.loading.show();
        this.$api.get(`getcustomer/${this.id}`).then((res) => {
          this.$q.loading.hide();
          this.form = res;
        });
      }
    },
  },
  mounted() {
    this.$emit("setTittle", "Cliente");
    this.id = this.$route.params.id;
    this.getInfo();
  },
};
</script>