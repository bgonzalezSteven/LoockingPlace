<template>
  <div>
    <div v-if="tab">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-caption">Cliente</q-item-label>
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
                        (options.find(label => label._id === form.customer)).label
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
            <q-item-label class="text-bold text-caption">Servicio</q-item-label>
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
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-caption"> Noches </q-item-label>
            <q-item-label>
              <q-input
                filled
                v-model="form.entryDate"
                mask="form.entryDate"
                :rules="['form.entryDate']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.entryDate">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Perfecto"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                filled
                v-model="form.exitDate"
                mask="form.exitDate"
                :rules="['form.exitDate']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.exitDate">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Perfecto"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-label>
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
    <div v-else>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold"
              >Costo: {{ parseFloat(form.paypament.coste) }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Metodo:</q-item-label>
            <q-item-label>
              <q-select
                emit-value
                map-options
                :options="options3"
                rounded
                outlined
                dense
                v-model="form.paypament.methods"
                color="negative"
                stack-label
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      Registre metodos
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Referencia:</q-item-label>
            <q-item-label>
              <q-input
                rounded
                outlined
                dense
                color="negative"
                v-model="form.paypament.ref"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <template>
      <vs-button block v-if="tab" @click="submit">Calcular costo</vs-button>
      <vs-button block v-else @click="save" class="bg-positive"
        >Imprimir factura</vs-button
      >
    </template>
    <template> </template>
  </div>
</template>
<script>
import moment from "moment";
import currency from "currency.js";
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      customer: {
        required,
      },
      entryDate: {
        required,
      },
      exitDate: {
        required,
      },
      room: {
        required,
      },
      service: {
        required,
      },
    },
  },
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
        paypament: {
          coste: 0.0,
        },
        entryDate: "2021/01/01",
        exitDate: "2021/01/02",
      },
      options: [],
      options2: [],
      options3: [],
      tab: true,
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
    async cons() {
      console.log(this.form.customer);
    },
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
        // calcula los dias que hay entre dos fechas y me arroja la diferencia
        let entry = moment(this.form.entryDate);
        let exit = moment(this.form.exitDate);
        this.form.paypament.coste = currency(this.form.service.coste).multiply(
          parseInt(exit.diff(entry, "days")) + 1
        );
        if (parseInt(exit.diff(entry, "days")) + 1 <= 0) {
          this.$vs.notification({
            title: "Alto ahi",
            text: "No puedes seleccionar una fecha menor a la entrada",
            color: "danger",
            position: "bottom-center",
          });
        } else {
          console.log(this.form);
          this.tab = false;
        }
      }
    },
    async save() {
      this.$q.loading.show();
      this.$api.post("reservation", this.form).then((res) => {
        this.$q.loading.hide();
      });
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