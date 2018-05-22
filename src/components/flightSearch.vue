<template>
        <v-layout column >
          <v-flex xs12 text-xs-center>
            <h2>Search</h2>
          </v-flex>
          <v-flex xs12>
            <v-select
            :items="statesFilter"
            v-model="fromState"
            label="From : "
            autocomplete
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
            :items="statesFilter"
            v-model="toState"
            label="To : "
            autocomplete
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="date"
            >
              <v-text-field
                slot="activator"
                label="Picker in menu"
                v-model="date"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-select
              :items="passengersCount"
              v-model="adultCount"
              label="Adults"
              class="input-group--focused"
              item-value="text"
            ></v-select>
          </v-flex>
          <!-- <v-flex xs12>
            <v-select
              :items="childrensCount"
              v-model="childCount"
              label="Children"
              class="input-group--focused"
              item-value="text"
            ></v-select>
          </v-flex> -->
          <v-flex xs12 text-xs-center>
            <v-btn @click="search()" color="info">Search</v-btn>
          </v-flex>
        </v-layout>
</template>
<script>
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';
import { state }  from '@/shared.js';

import _ from 'underscore'
  export default {
    name: 'flightSearch',
    data: () => ({
      // fromState : null,
      fromState :"Charlotte, CLT",
      // toState : null,
      toState : "New York, LGA",
      // date: null,
      date : "2018-04-24",
      menu: false,
      modal: false,
      adultCount : 1,
      childCount : 0,
      passengersCount : [ 1,2,3,4,5,6,7,8,9,10],
      childrensCount : [ 0,1,2,3,4,5,6,7,8,9,10],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      statesFilter: []
    }),
    methods:{
      search(){
        let searchObject = {
            "from":this.fromState,
            "to":this.toState,
            "date":this.date,
            "numberOfSeats":this.adultCount + this.childCount
        }
        state.numberOfSeats = this.adultCount + this.childCount
        EventBus.$emit('searchFlight',  true )
        EventBus.$emit('searchForFlights',  searchObject )

      }
    },
    mounted() {
      //do something after mounting vue instance
      let that = this;
      axios.get('http://55fb3079.ngrok.io/airline/rest/getCityList').then(response => {
        console.log(response);
        if(response.data.status.statusCode == "200"){
          console.log(response.data.cities);
           _.filter(response.data.cities,function(city){  that.statesFilter.push(city.cityName); });
          console.log(that.statesFilter);
        }else{

        }
      })
      .catch(e => {
        console.log(e);
      })
  }
}
</script>

<style media="screen">
  .upperMargin{
    margin-top: 5%;
  }
</style>
