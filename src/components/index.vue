<template>
  <v-app id="inspire">
    <v-navigation-drawer
  fixed
  v-model="drawer"
  app
  v-if = "showNav"
>
  <v-list dense>
    <v-list-tile @click="goHome()">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="logout()">
      <v-list-tile-action>
        <v-icon>power_settings_new</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="bookingHistory()">
      <v-list-tile-action>
        <v-icon>event</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Booking History</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app row  >
      <v-toolbar-side-icon v-show="showNav" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-xs-center" style="width:100%"> Arline Reservation</v-toolbar-title>
    </v-toolbar>
    <v-content>


          <router-view></router-view>

      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text"> &nbsp; Developed with &hearts; for &nbsp;  <span style="font-size:140%;">&#x2708;</span> </span>
    </v-footer>
  </v-app>
</template>

<script>

import axios from 'axios'
import {EventBus}  from '@/event-bus.js';

  export default {
    name: 'index',
    data: () => ({
       drawer: false,
       showLogin : null,
       showNav : false
    }),
    methods: {
      logout() {
        localStorage.removeItem("Ar_id");
        this.$router.push('login');
      },
      goHome() {
        this.drawer = false;
        this.$router.push('home');
      },
      logout() {
        this.drawer = false;
        this.$router.push('login');
        EventBus.$emit('showNav',false)

      },
      bookingHistory(){
        this.drawer = false;
        this.$router.push('bookingHistory');
      }
    },
    mounted(){
      let that = this;
      EventBus.$on('showNav',function(data){
        console.log("jvjsvjds");
        that.showNav = data
      })

    }
}
</script>
