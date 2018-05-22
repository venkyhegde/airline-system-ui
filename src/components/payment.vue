<template>
    <v-container  fluid fill-height >
<v-layout
      justify-center
      align-center row
    >
      <v-flex xs4 text-xs-center>
        <v-container fluid>
          <v-card v-show="!loading" style="padding:2%">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-center">
                  <h2>Payment</h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-flex xs12>
                  <v-text-field
                    label="Card Number"
                     v-model="cardDetails.number"
                     :rules="nameRules"
                     required
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap>
                    <v-flex xs3>
                      <v-text-field
                        label="Pin"
                         v-model="cardDetails.pin"
                         :rules="nameRules"
                         required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs3 style="padding-left:1%">
                      <v-text-field
                        label="Month"
                         v-model="cardDetails.month"
                         :rules="nameRules"
                         required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs3 style="padding-left:1%">
                      <v-text-field
                        label="Year"
                         v-model="cardDetails.year"
                         :rules="nameRules"
                         required
                      ></v-text-field>
                    </v-flex>
                </v-layout>
              </v-flex>
                <v-flex xs12 class="upperMargin" >
                  <v-btn @click="submit" :disabled="!valid" color="success">Pay</v-btn>
                </v-flex>
            </v-layout>
            </v-form>
          </v-card>
            <v-card v-show="loading" style="padding:2%">
              <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
              <h2>Processing Payment...</h2>
            </v-card>
          </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';
import { state }  from '@/shared.js';

  export default {
    name: 'payment',
    data: () => ({
      cardDetails : {},
      nameRules: [
       v => !!v || 'required'
     ],
     loading : false
    }),
    methods:{
      submit () {
        this.loading = true
        // if (this.$refs.form.validate()) {
          console.log(state);
          let date = new Date();
          let data = {
            "userId" : JSON.parse(localStorage.getItem("Ar_id")),
            "itineraryId" : state.selectedFlight.itineraryId ,
            // "itineraryId" : 4,
            "numberOfSeatBooked" :state.selectedFlight.numberOfSeats ,
            "ticketCost": state.selectedFlight.numberOfSeats * state.selectedFlight.pricePerSeat,
            // "bookingDate": date.getFullYear() +"-"+JSON.parse(date.getMonth())+1+"-"+JSON.parse(date.getDay())+1,
            "bookingDate" : "2018-04-26",
            "bookedSeats": state.forPaymentData.selectedSeats.join(", "),
            "duration": state.selectedFlight.duration,
            "updatedSeats" : state.forPaymentData.seatArray
          }
          console.log(data);
          let that = this
          axios.post('http://55fb3079.ngrok.io/airline/rest/bookingConfirmation',data).then(response => {
            console.log(response);
              that.loading = false
             state.bookingId = response.data.confirmationDetail.bookingInfo.bookingId;
             that.$router.push('conformationPage');


            // if(response.data.status.statusCode == "200"){
            // }
          })
          .catch(e => {
            console.log(e);
          })
        // }
      },
      bookingDetails(data){
        console.log(data);
      }
    },
    mounted() {
      //do something after mounting vue instance
      console.log(state);

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
