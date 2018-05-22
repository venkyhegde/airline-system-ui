<template>
  <v-container fill-height fluid grid-list-md>
    <v-layout  row wrap>
      <v-flex style="padding:.5%;height: 50%" xs3>
        <v-card style="height:100%;padding:5%">
        <v-layout column >
          <v-flex xs12 text-xs-center>
            <h2>Booking Info</h2>
          </v-flex>
          <v-flex xs12>
            <h2>From : {{selectedFlight.from}}</h2>
          </v-flex>
          <v-flex xs12>
            <h2>To : {{selectedFlight.to}}</h2>
          </v-flex>
          <v-flex xs12>
            <h2>Date : {{selectedFlight.dateOfJourney}}</h2>
          </v-flex>
          <!-- <v-flex xs12>
            <h2>Time : </h2>
          </v-flex> -->
          <v-flex xs12>
            <h2>Cost : {{selectedFlight.pricePerSeat}}</h2>
          </v-flex>
          <v-flex xs12>
            <h2>Seats:
              <span v-if="seatSelection.length > 0" style="margin-left:4%"v-for="seat in seatSelection">{{seat}}</span>
            </h2>
          </v-flex>
          <v-flex xs12 text-xs-center>
            <v-btn @click="payment()" color="info">Pay</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      </v-flex>
      <v-flex fill-height style="padding:.5%;" xs9>
        <v-card>
          <div class="plane">
            <div class="cockpit">
              <h1>Please select a seat</h1>
            </div>
            <div class="exit exit--front fuselage">

            </div>
            <ol v-show="showSeats" class="cabin fuselage">
              <li v-for="(row,index) in seatRows" class="row row--1">
                <ol class="seats" :type="row">
                  <li class="seat" :id="index">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'A']" :id="index+1+'A'" />
                    <label :for="index+1+'A'">{{index+1}}A</label>
                  </li>
                  <li class="seat" :id="index + 1">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'B']" :id="index+1+'B'" />
                    <label :for="index+1+'B'">{{index+1}}B</label>
                  </li>
                  <li class="seat" :id="index + 2">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'C']" :id="index+1+'C'" />
                    <label :for="index+1+'C'">{{index+1}}C</label>
                  </li>
                  <li class="seat" :id="index + 3">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'D']" :id="index+1+'D'" />
                    <label :for="index+1+'D'">{{index+1}}D</label>
                  </li>
                  <li class="seat" :id="index + 4">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'E']" :id="index+1+'E'" />
                    <label :for="index+1+'E'">{{index+1}}E</label>
                  </li>
                  <li class="seat" :id="index + 5">
                    <input type="checkbox" :disabled="bookedSeats[index+1+'F']" :id="index+1+'F'" />
                    <label :for="index+1+'F'">{{index+1}}F</label>
                  </li>
                </ol>
              </li>
            </ol>
            <div class="exit exit--back fuselage">

            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';
import { state }  from '@/shared.js';
// import _ from 'underscore'
var resultArray = [];
var flightDetails = {};
  export default {
    name: 'seatSelection',
    data: () => ({
      seatRows : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'],
      test : false,
      seatSelection : [],
      selectedFlight : {},
      resultData : null,
      showSeats : false,
      bookedSeats: {},
      seatsLayout : {"1A":true,"1B":false,"1C":false,"1D":false,"1E":false,"1F":false,"2A":false,"2B":false,"2C":false,"2D":false,"2E":false,"2F":false,"3A":false,"3B":false,"3C":false,"3D":false,"3E":false,"3F":false,"4A":false,"4B":false,"4C":false,"4D":false,"4E":false,"4F":false,"5A":false,"5B":false,"5C":false,"5D":false,"5E":false,"5F":false,"6A":false,"6B":false,"6C":false,"6D":false,"6E":false,"6F":false,"7A":false,"7B":false,"7C":false,"7D":false,"7E":false,"7F":false,"8A":false,"8B":false,"8C":false,"8D":false,"8E":false,"8F":false,"9A":false,"9B":false,"9C":false,"9D":false,"9E":false,"9F":false,"10A":false,"10B":false,"10C":false,"10D":false,"10E":false,"10F":false,"11A":false,"11B":false,"11C":false,"11D":false,"11E":false,"11F":false,"12A":false,"12B":false,"12C":false,"12D":false,"12E":false,"12F":false,"13A":false,"13B":false,"13C":false,"13D":false,"13E":false,"13F":false,"14A":false,"14B":false,"14C":false,"14D":false,"14E":false,"14F":false,"15A":false,"15B":false,"15C":false,"15D":false,"15E":false,"15F":false,"16A":false,"16B":false,"16C":false,"16D":false,"16E":false,"16F":false,"17A":false,"17B":false,"17C":false,"17D":false,"17E":false,"17F":false,"18A":false,"18B":false,"18C":false,"18D":false,"18E":false,"18F":false,"19A":false,"19B":false,"19C":false,"19D":false,"19E":false,"19F":false,"20A":false,"20B":false,"20C":false,"20D":false,"20E":false,"20F":false,"21A":false,"21B":false,"21C":false,"21D":false,"21E":false,"21F":false,"22A":false,"22B":false,"22C":false,"22D":false,"22E":true,"22F":false,"23A":false,"23B":false,"23C":false,"23D":false,"23E":false,"23F":false}
    }),
    methods:{
      bindClickEvent(e) {
        console.log(e);
        let that = this;
        if (e.srcElement.attributes[2].value !=undefined) {
          let id = e.srcElement.attributes[2].value;
          id = id.toString();
          let row = id.charAt(1);
          let n_row = id.charAt(0);
          let i_num = JSON.parse(this.seatRows.indexOf(row))  + (JSON.parse(n_row) -1) * 6;
          if (this.seatSelection.indexOf(id) == -1) {
            this.seatSelection.push(id);
            // this.bookedSeats[id] = true;
            resultArray[i_num] = true;
            console.log(resultArray);


          }else{
            let index = this.seatSelection.indexOf(id);
            this.seatSelection.splice(index,1);
            // this.bookedSeats[id] = false;
            resultArray[i_num] = false;
            console.log(resultArray);
          }
        }
      },
      payment(){
        console.log(resultArray);

        let finalObject = {
          "flightDetails" : flightDetails,
          "seatArray" : resultArray,
          "selectedSeats" : this.seatSelection
        }
        state.forPaymentData = finalObject;
        this.$router.push('payment');
      },
      getSeats(data){
        console.log(data);
        flightDetails = data
        let that = this;
        this.selectedFlight = JSON.parse(JSON.stringify(data));
        this.showSeats = false
        axios.get('http://55fb3079.ngrok.io/airline/rest/getSeats/'+data.itineraryId).then(response => {
          console.log(response);
          resultArray = response.data.seats;
          console.log(resultArray);
          if(response.status == 200){
            that.resultData = response.data.seats;
            let index = 0;
            for(var seat in that.seatsLayout){
              that.bookedSeats[seat] = response.data.seats[index];
              index++;
            }
            that.showSeats = true
            that.bindEvents()
            console.log(that.bookedSeats);
          }
        })
        .catch(e => {
          console.log(e);
        })
      },
      bindEvents(){
      console.log("hi");
        let classname = document.getElementsByClassName("seat");
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', this.bindClickEvent, false);
        }

      }
    },
    mounted() {
      //do something after mounting vue instance

      this.getSeats(state.selectedFlight);


    }
}
</script>
<style lang="scss" scoped>
*,*:before,*:after {
  box-sizing: border-box;
}
html {
  font-size: 16px;
}

.plane {
  margin: 20px auto;
  max-width: 300px;
}

.cockpit {
  height: 250px;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-bottom: 5px solid #d8d8d8;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100%;
    border-radius: 50%;
    border-right: 5px solid #d8d8d8;
    border-left: 5px solid #d8d8d8;
  }
  h1 {
    width: 60%;
    margin: 100px auto 35px auto;
  }
}

.exit {
  position: relative;
  height: 50px;
  &:before,
  &:after {
    content: "EXIT";
    font-size: 14px;
    line-height: 18px;
    padding: 0px 2px;
    font-family: "Arial Narrow", Arial, sans-serif;
    display: block;
    position: absolute;
    background: green;
    color: white;
    top: 50%;
    transform: translate(0, -50%);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}

.fuselage {
  border-right: 5px solid #d8d8d8;
  border-left: 5px solid #d8d8d8;
}

ol {
  list-style :none;
  padding: 0;
  margin: 0;
}

.row {

}

.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.seat {
  display: flex;
  flex: 0 0 14.28571428571429%;
  padding: 5px;
  position: relative;
  &:nth-child(3) {
    margin-right: 14.28571428571429%;
  }
  input[type=checkbox] {
    position: absolute;
    opacity: 0;
  }
  input[type=checkbox]:checked {
    + label {
      background: #bada55;
      -webkit-animation-name: rubberBand;
          animation-name: rubberBand;
      animation-duration: 300ms;
      animation-fill-mode: both;
    }
  }
  input[type=checkbox]:disabled {
    + label {
      background: #dddddd;
      text-indent: -9999px;
      overflow: hidden;
      &:after {
        content: "X";
        text-indent: 0;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translate(-50%, 0%);
      }
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
  label {
    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5rem;
    padding: 4px 0;
    background: #F42536;
    border-radius: 5px;
    animation-duration: 300ms;
    animation-fill-mode: both;

    &:before {
      content: "";
      position: absolute;
      width: 75%;
      height: 75%;
      top: 1px;
      left: 50%;
      transform: translate(-50%, 0%);
      background: rgba(255,255,255,.4);
      border-radius: 3px;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0px 2px #5C6AFF;
    }

  }
}

@-webkit-keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}

@keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  -webkit-animation-name: rubberBand;
          animation-name: rubberBand;
}
</style>
<style media="screen">
  .upperMargin{
    margin-top: 5%;
  }
</style>
