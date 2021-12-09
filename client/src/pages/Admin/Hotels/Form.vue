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
            label="Nombre"
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
            v-model="form.rif"
            label="Rif"
            mask="A-#############"
            :error="$v.form.rif.$error"
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
            v-model="form.direction"
            label="Direción"
            :error="$v.form.direction.$error"
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
            :error="$v.form.email.$error"
            error-message="Dato necesario / Ingrese un Email"
          />
        </div>
        <div
          style="padding-right: 8px; padding-bottom: 10px"
          class="col-xs-11 col-sm-4 col-md-3 col-xl-2"
        >
          <q-select
            dense
            rounded
            outlined
            v-model="form.role"
            label="Rol"
            :options="options"
            :error="$v.form.role.$error"
            error-message="Dato necesario"
          />
        </div>
      </div>
    </div>
    <vs-button block style="margin: 1px; font-size: 11pt" @click="submit"
      >Enviar
      <q-icon name="send" style="margin-left: 4px" />
    </vs-button>
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
      direction: {
        required,
      },
      rif: {
        required,
      },
      role: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$emit("setTittle", "Hotel");
    this.getRole();
  },
  data() {
    return {
      form: {},
      options: [],
      id: "",
    };
  },
  methods: {
    async submit() {
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
    async getRole() {
      this.$q.loading.show();
      this.$api.get("getRol").then((res) => {
        this.options = res;
        this.$q.loading.hide();
      });
      if (this.id) {
        this.$q.loading.show();
        this.$api.get(`getHotels/${this.id}`).then((res) => {
          this.$q.loading.hide();
          this.form = res;
        });
      }
    },
  },
};
</script>