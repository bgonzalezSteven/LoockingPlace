<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        :class="`${
          $q.platform.is.mobile
            ? 'fullscreen column items-center justify-center'
            : 'row'
        }`"
      >
        <q-parallax v-if="$q.platform.is.mobile">
          <template v-slot:media>
            <div class="gradient" />
          </template>

          <template v-slot:content="scope">
            <div
              :style="{
                top: scope.percentScrolled * 20 + '%',
                left: 0,
                right: 0,
              }"
            >
              <div>
                <q-intersection transition="rotate">
                  <q-card class="men" style="border-radius: 40px">
                    <q-card-section class="row justify-center items-center">
                      <q-img style="width: 60%" src="../assets/logo.png" />
                      <div class="text-h5">Loocking Place</div>
                      <div class="text-caption text-grey text-bold">
                        Sistema de Reservaciones Hotelarias 
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <q-form @submit="onSubmit" class="q-pt-md">
                        <q-input
                          dense
                          v-model="form.email"
                          label="Usuario *"
                          :error="$v.form.email.$error"
                          error-message="Usuario necesario"
                        >
                          <template v-slot:prepend>
                            <q-icon name="mail"></q-icon>
                          </template>
                        </q-input>

                        <q-input
                          dense
                          :type="isPwd ? 'password' : 'text'"
                          v-model="form.password"
                          label="Contraseña *"
                          :error="$v.form.password.$error"
                          error-message="Contraseña necesaria"
                        >
                          <template v-slot:prepend>
                            <q-icon name="https"></q-icon>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="isPwd ? 'visibility_off' : 'visibility'"
                              class="cursor-pointer"
                              @click="isPwd = !isPwd"
                            />
                          </template>
                        </q-input>
                        <div class="text-caption text-grey text-bold">
                          ¿Olvido su contraseña?
                        </div>
                        <br />
                        <br />
                        <div class="text-center q-ma-sm">
                          <vs-button
                            type="submit"
                            block
                            circle
                            floating
                            class="bg-primary"
                            style="font-size: 12pt"
                          >
                            Ingresar
                          </vs-button>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-intersection>
              </div>
            </div>
          </template>
        </q-parallax>
        <template v-else>
            <div class="col row justify-center justify-center">
              <q-card class="men" style="border-radius: 40px">
                    <q-card-section class="row justify-center items-center">
                      <q-img style="width: 60%" src="../assets/logo.png" />
                      <div class="text-h5">Loocking Place</div>
                      <div class="text-caption text-grey text-bold">
                        Sistema de Reservaciones Hotelarias
                      </div>
                    </q-card-section>
                <q-card-section>
                  <q-form @submit="onSubmit" class="q-pt-md">
                    <q-input
                      dense
                      v-model="form.email"
                      label="Usuario *"
                      :error="$v.form.email.$error"
                      error-message="Usuario necesario"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mail"></q-icon>
                      </template>
                    </q-input>

                    <q-input
                      dense
                      :type="isPwd ? 'password' : 'text'"
                      v-model="form.password"
                      label="Contraseña *"
                      :error="$v.form.password.$error"
                      error-message="Contraseña necesaria"
                    >
                      <template v-slot:prepend>
                        <q-icon name="https"></q-icon>
                      </template>
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <div class="text-caption text-grey text-bold">
                      ¿Olvido su contraseña?
                    </div>
                    <br />
                    <br />
                    <div class="text-center q-ma-sm">
                      <vs-button
                        type="submit"
                        block
                        circle
                        floating
                        class="bg-primary"
                        style="font-size: 12pt"
                      >
                        Ingresar
                      </vs-button>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-7 imageness"></div>
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "MyLayout",
  validations: {
    form: {
      email: { required },
      password: { required },
    },
  },
  data() {
    return {
      form: {},
      isPwd: true,
      loading: false,
      band: "",
    };
  },
  mounted() {
    this.verification();
    this.$q.dark.set(false);
  },
  watch: {
    "$q.platform.is.mobile"(val) {
      console.log(val);
    },
  },
  methods: {
    ...mapActions("generals", ["logout"]),
    ...mapMutations("generals", ["login"]),
    ...mapGetters("generals", ["verificate"]),
    async verification() {
      const verificate = JSON.parse(localStorage.getItem("sessionInfo"));
      if (verificate) {
        this.$router.push("/menu");
      }
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        console.log("error");
      } else {
        this.$q.loading.show();
        this.$api.post("login", this.form).then((res) => {
          if (res) {
            this.login(res);
            this.$router.push("/menu");
          }
          this.$q.loading.hide();
        });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.q-page
  font-family: 'Dancing Script', cursive
  background: #f1f1f1
.men
  width: 22em
  box-shadow: none
  background-color: #ffffff00
.imageness
  background-image: url('../assets/123.jpg')
  background-size: cover
  clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%)
</style>