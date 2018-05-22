<template>
  <v-container fill-height fluid grid-list-md>
    <flight-search-animation v-if="searching" ></flight-search-animation>
    <v-layout  v-show="!searching" row wrap>
      <v-flex style="padding:.5%;" xs3>
        <v-card style="height:100%;padding:5%">
          <flight-search></flight-search>
      </v-card>
      </v-flex>
      <v-flex fill-height style="padding:.5%;" xs9>
        <search-results></search-results>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import flightSearch from './flightSearch.vue'
import searchResults from './searchResults.vue'
import flightSearchAnimation from './flightSearchAnimation.vue'
import {EventBus}  from '@/event-bus.js';

  export default {
    name: 'home',
    components: {
      'flight-search' : flightSearch,
      'search-results' : searchResults,
      'flight-search-animation' : flightSearchAnimation
    },
    data: () => ({
      searching : false
    }),
    methods:{
      enableAnimation(data){
        console.log(data);
        this.searching = val
      }
    },
    mounted() {
      let that = this;
      //do something after mounting vue instance
      EventBus.$on('searchFlight',  function(data){
        console.log(data);
        that.searching = data
      });
      EventBus.$emit('showNav',true)
    }
}
</script>

<style media="screen">
  .upperMargin{
    margin-top: 5%;
  }
</style>
