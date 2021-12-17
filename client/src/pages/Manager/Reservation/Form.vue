<template>
  <div>
    <div class="row">
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold text-caption"
                >Cliente</q-item-label
              >
              <q-item-label>
                <q-select
                  emit-value
                  map-options
                  :options="options"
                  rounded
                  outlined
                  dense
                  v-model="form.customer"
                  color="negative"
                  stack-label
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        Registre clientes
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected>
                    <q-chip
                      v-if="form.customer"
                      dense
                      square
                      color="white"
                      text-color="primary"
                      class="q-my-none q-ml-xs q-mr-none"
                    >
                      <q-avatar
                        color="primary"
                        text-color="white"
                        icon="people"
                      />
                      {{
                        // Funcion para encontrar el punto del index y mostrar el valor, tomando en consideracion su _id solamente
                        options[
                          options.findIndex(function () {
                            if (options._id === form.custoomer) {
                              return true;
                            }
                          })
                        ].label
                      }}
                    </q-chip>
                    <q-badge v-else>*No seleccionado*</q-badge>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <q-icon name="people" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name" />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold text-caption"
                >Servicio</q-item-label
              >
              <q-item-label>
                <q-select
                  @select="selectedRange"
                  option-label="type"
                  emit-value
                  map-options
                  :options="options2"
                  rounded
                  outlined
                  dense
                  v-model="form.service"
                  color="negative"
                  stack-label
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        Registre servicios
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-label>
              <q-item-label class="text-bold text-caption"
                >Habitación</q-item-label
              >
              <q-item-label>
                <q-select
                  :options="form.service.range"
                  rounded
                  outlined
                  dense
                  v-model="form.room"
                  color="negative"
                  stack-label
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        Registre servicios
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-label>
              <q-item-label class="text-bold text-caption"
                >Costo por noche</q-item-label
              >
              <q-item-label>
                <q-input
                  disable
                  rounded
                  outlined
                  dense
                  :placeholder="`${form.service.coste} - para ${
                    form.service.capacity
                  } ${form.service.capacity > 1 ? 'personas' : 'persona'}`"
                  color="negative"
              /></q-item-label>
            </q-item-section>
          </q-item>
          <!--<q-item>
        <q-item-section>
          <q-item-label class="text-bold text-caption"
            >Metodo de Pago</q-item-label
          >
          <q-item-label>
            <q-select
              @select="selectedRange"
              option-value="_id"
              option-label="type"
              emit-value
              map-options
              :options="options3"
              rounded
              outlined
              dense
              v-model="form.methodsPaypament"
              color="negative"
              stack-label
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey">
                    Registre servicios
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-label>
        </q-item-section>
      </q-item>Metodo de pago-->
        </q-list>
      </div>
      <div class="col">
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-caption"
              >Noches de hospedaje</q-item-label
            >
            <q-item-label>
              <q-date style="min-width: 254px;" v-model="form.date" range />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>

    <template>
      <vs-button @click="submit">Reservar</vs-button>
    </template>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getCustomer();
  },
  data() {
    return {
      form: {
        service: {
          type: "",
          range: [],
          coste: 0.0,
          capacity: 0,
        },
      },
      options: [],
      options2: [],
      options3: [],
    };
  },
  methods: {
    async getCustomer() {
      this.$q.loading.show();
      this.$api.get("getCustomer").then((res) => {
        this.options = res.customer;
        this.options2 = res.service;
        this.options3 = res.paypament;
        this.$q.loading.hide();
      });
    },
    async submit() {
      console.log(this.form);
    },
    async selectedRange() {
      this.form.service = {
        type: "",
        range: [],
      };
      this.form.room = "";
      console.log(this.form.service);
    },
  },
};
</script>
<style scoped>
</style>