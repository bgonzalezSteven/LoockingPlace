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
            v-model="form.slug"
            label="Slug"
            :error="$v.form.slug.$error"
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
            v-model="form.description"
            label="Descripción"
            :error="$v.form.description.$error"
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
            v-model="form.permissions"
            label="Permisos"
            multiple
            :options="options"
            :error="$v.form.permissions.$error"
            error-message="Dato necesario"
          />
        </div>
      </div>
    </div>
    <vs-button block style="margin: 1px;font-size: 11pt;" @click="submit">Enviar
      <q-icon name="send" style="margin-left: 4px"/>
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
      description: {
        required,
      },
      slug: {
        required,
      },
      permissions: {
        required,
      },
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$emit("setTittle", "Rol");
    this.getPermissions();
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
        this.$api.post("role", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    async getPermissions() {
      this.$q.loading.show();
      this.$api.get("permissions").then((res) => {
        this.$q.loading.hide();
        this.options = res;
        console.log(this.options);
      });
      if (this.id) {
        this.$q.loading.show();
        this.$api.get(`getRole/${this.id}`).then((res) => {
          this.$q.loading.hide();
          this.form = res;
        });
      }
    },
  },
};
</script>