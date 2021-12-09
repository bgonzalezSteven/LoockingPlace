<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import Vuesax from "vuesax";
import Vuelidate from "vuelidate";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import money from 'v-money'
 
// register directive v-money and component <money>
Vue.use(money, {precision: 4})
Vue.use(Vuelidate);
Vue.use(Vuesax, {
  colors: {
    primary: "#072D44",
    success: "#064469",
    accent: "#5790AB",
    danger: "rgb(242, 19, 93)",
    warning: "rgb(255, 130, 0)",
    dark: "rgb(36, 33, 69)",
  },
});

export default {
  name: "App",
};
</script>
