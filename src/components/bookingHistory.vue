<template>
    <v-container  fluid fill-height >
<v-layout
      justify-center
      row
    >
      <v-flex xs8 style="height:100%" text-xs-center>
        <v-card style="padding:1%" raised>
          <h1>Booking List</h1>
        </v-card>
        <v-card v-for="booking in data" style="padding:1%;margin-top:2%" raised>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs2 text-xs-center>
                  <v-avatar
                      :tile="tile"
                      :size="'50%'"
                      class="grey lighten-4"
                    >
                    <img :src="booking.airline.airlineLogo" alt="Image">
                  </v-avatar>
                </v-flex>
                <v-flex xs10 style="padding-right:20%">
                  <h1>{{booking.airline.airlineName}}</h1>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex style="padding-top:2%" xs12>
              <v-layout row wrap>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px">From : {{booking.from}}</span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px">To : {{booking.to}}</span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px"> Date : {{booking.dateOfBooking}} </span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <!-- <span style="font-size: 19px"> Duration : {{booking.duration}} </span> -->
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex style="padding-top:2%" xs12>
              <v-layout row wrap>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px">Number of Seats : {{booking.numberOfSeats}}</span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px">Flight Number : {{booking.flightNumber}}</span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <span style="font-size: 19px">Cost : {{booking.totalCost}}$ </span>
                </v-flex>
                <v-flex xs3 text-xs-center>
                  <v-btn @click="viewBooking(booking)" style="margin-top:0;margin-bottom:0;"color="info">View</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';
import { state }  from '@/shared.js';

  export default {
    name: 'bookingHistory',
    data: () => ({
      data : [],
      userId : JSON.parse(localStorage.getItem("Ar_id"))
    }),
    methods:{
      viewBooking(data){
        state.bookingId = data.bokingId
        this.$router.push('conformationPage');
      }
    },
    mounted() {
      let that = this
      axios.get('http://55fb3079.ngrok.io/airline/rest/bookingHistory/'+this.userId).then(response => {
        console.log(response);
        that.data = response.data.bookingHistoryDetails
        // if(response.data.status.statusCode == "200"){
        // }
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
    opacity: 1;
  }
  .image{
    background-image: url('../assets/bg.jpg');
    height: 100%;
    background-position: center;
    background-size: cover;
    /* position: relative; */
    color: white;
    font-size: 25px;
  }
  .textStyle{
    font-family: "Courier New", Courier, monospace;
  }

</style>
