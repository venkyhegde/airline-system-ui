<template>
    <v-container  fluid fill-height >
<v-layout
      justify-center
      row
    >
      <v-flex xs8 style="height:100%" text-xs-center>
        <v-card style="height:100%" >
          <v-layout row wrap>
            <v-flex xs12>
              <h1 style="padding-top:2%;font-size:40px">Booking Details</h1>
            </v-flex>
            <v-flex xs12>
              <h1>Barcode</h1>
            </v-flex>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">From : {{data.flightInfo.destination}}</h1>
                </v-flex>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">To : {{data.flightInfo.source}}</h1>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Date : {{data.flightInfo.dateOfJourney}}</h1>
                </v-flex>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Cost : {{data.paymentInfo.totalPrice}}$</h1>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Duration : {{data.flightInfo.duration}}</h1>
                </v-flex>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Number of Passengers : {{data.paymentInfo.numberOfSeats}}</h1>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Seats : </h1>
                </v-flex>
                <v-flex xs6>
                  <h1 style="padding-top:2%;font-size:25px">Booking ID : {{data.bookingInfo.bookingId}}</h1>
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
    name: 'conformationPage',
    data: () => ({
      data : {}
    }),
    methods:{


    },
    mounted() {
      let that = this;
      axios.get('http://55fb3079.ngrok.io/airline/rest/viewTicket/'+state.bookingId).then(response => {
        if (response.data.status.status == "Succes") {
          that.data =  response.data.confirmationDetail;
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
