<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app row  >
      <v-toolbar-title class="text-xs-center" style="width:100%">Storjify #ETHDENVER / StrasseMusik</v-toolbar-title>
    </v-toolbar>
    <v-content>


          <router-view></router-view>

      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text"> Saipavan Narasaraj - UNC of Charlotte For #ETHDENVER</span>
    </v-footer>
  </v-app>
</template>

<script>

import axios from 'axios'

  export default {
    name: 'index'
}
</script>
