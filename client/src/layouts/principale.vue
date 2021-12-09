<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="fullscreen column items-center justify-center">
        <div class="text-bold text-center font">
          Reserve
        </div>
        <div class="text-italic text-center textt">
          Un sistema de reservación hotelaria, inventario y control general
        </div>
        <div class="q-pt-md font">
          <vs-button @click="$router.push('/login')" secondary>
            Continuar
            <q-icon style="padding-left: 4px" name="send"/>
          </vs-button>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap')
  .q-page
    background: linear-gradient(to bottom, #348f50, #56b4d3)
  .font
    font-family: 'Dancing Script', cursive
    font-size: 40pt
    color: #fff
  .textt
    font-family: 'Dancing Script', cursive
    color: #fff
    font-size: 14pt
</style>