<template>
  <div class="">
    <v-card v-show="flightDetails.length > 0" v-for="flight in flightDetails" style="padding:1%;margin-top:2%" raised>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs2 text-xs-center>
              <v-avatar
                  :tile="tile"
                  :size="'50%'"
                  class="grey lighten-4"
                >
                <img :src="flight.logo" alt="Image">
              </v-avatar>
            </v-flex>
            <v-flex xs10>
              <h2>{{flight.airlineName}}</h2>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex style="padding-top:2%" xs12>
          <v-layout row wrap>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px">From : {{flight.from}}</span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px">To : {{flight.to}}</span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px"> Date : {{flight.dateOfJourney}} </span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px"> Duration : {{flight.duration}} </span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex style="padding-top:2%" xs12>
          <v-layout row wrap>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px">Depature: 10 AM</span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px">Arrival : 2 PM</span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <span style="font-size: 19px">Cost : {{flight.pricePerSeat}}$ </span>
            </v-flex>
            <v-flex xs3 text-xs-center>
              <v-btn @click="book(flight)" style="margin-top:0;margin-bottom:0;"color="info">Book</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <div v-show="flightDetails.length ==0" style="padding:1%;height:100%">
      <v-layout
            justify-center
            align-center row
          >
          <v-flex xs4 text-xs-center>
            <!-- <v-icon large style="font-size:200px;padding-top:35%">search</v-icon> -->
            <img src="https://www.mattsflights.com/wp-content/themes/mattsflights/images/search-flight-icon-img.png" style="margin-top:40%" alt="Image">
            <h1>Search For Flights</h1>
          </v-flex>
      </v-layout>
    </div>
    <v-speed-dial
      v-model="fab"
      :top="true"
      :bottom="false"
      :right="false"
      :left="false"
      :direction="'left'"
      :open-on-hover="true"
      :transition="transition"
      style="position:absolute; right:2%;top:9%"
      v-show="flightDetails.length >0"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>monetization_on</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="filter('high')"
      >
        <v-icon>vertical_align_top</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="filter('low')"
      >
        <v-icon>vertical_align_bottom</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';
import { state }  from '@/shared.js';

  export default {
    name: 'searchResults',
    data: () => ({
      flightDetails : [],
      noResultCard : false,
      direction: 'top',
       fab: false,
       fling: false,
       hover: false,
       tabs: null,
       top: true,
       right: false,
       bottom: false,
       left: false,
       transition: 'slide-y-reverse-transition'
    }),
    methods:{
      book(flight){
        console.log(state);
        // EventBus.$emit('selectedFlight',  flight )
        state.selectedFlight = flight;
        this.$router.push('seatSelection');
      },
      searhFilghts(data){
        let that = this;
          axios.post('http://55fb3079.ngrok.io/airline/rest/searchFlight',data).then(response => {
            console.log(response);
            if(response.data.status.statusCode == "200"){
              that.flightDetails = response.data.flightDetails;
              console.log(that.flightDetails);
            }else{

            }
          })
          .catch(e => {
            console.log(e);
          })
      },
      filter(data){
        console.log(data);
        if (data == "high") {
          this.flightDetails = _.sortBy(this.flightDetails, function(flight) {
            return flight.pricePerSeat; })

        }else{
          let filter = _.sortBy(this.flightDetails, function(flight) {
            return flight.pricePerSeat; })
            this.flightDetails = filter.reverse();
        }
      }
  },
  mounted() {
    console.log(state);

    //do something after mounting vue instance
    let that = this;
    EventBus.$on('searchForFlights',function(data){
      console.log("hoooo",data);
      that.searhFilghts(data);
    })
  }
}
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .speed-dial {
    position: absolute;
  }

  #create .btn--floating {
    position: relative;
  }
</style>
