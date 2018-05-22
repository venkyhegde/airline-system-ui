<template>
  <div id="layout" style="width:100%;height:100%;">
    <div id="flight" class="flight"></div>
    <v-progress-circular indeterminate style="width: 100%;margin:auto;margin-top:5%":size="80" :width="4" color="purple"></v-progress-circular>
    <h1 style="width:100%;margin:auto;margin-top:2%;color:white;text-align:center">Searching flights...</h1>
    <div class="runway">
      <div class="runwayNo">27 N</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {EventBus}  from '@/event-bus.js';

import '../assets/css/flightTakeOff.css';

  export default {
    name: 'flightSearchAnimation',
    data: () => ({
    }),
    methods:{
     simulate(){
      console.log("inside");
        let that = this;
        console.log("innn");
        $("#flight").addClass("run");
        setTimeout(function(){
          $("#flight").removeClass("run");
          EventBus.$emit('searchFlight',  false )
        },10000)
      }
  },
  mounted() {
    //do something after mounting vue instance
    this.simulate();
  },
  created() {
    //do something after creating vue instance
    this.simulate();
  }
}
</script>

<style lang="scss" scoped>
$imgUrl:"http://cdn.1001freedownloads.com/vector/thumb/84314/airliner.png";


@mixin matrix($x, $y, $angle){
  -ms-transform: translate($x,$y) rotate($angle);
  -moz-transform: translate($x,$y) rotate($angle);
  -webkit-transform: translate($x,$y) rotate($angle);
  transform: translate($x,$y) rotate($angle);
}
#layout {
  background: url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/RKwGR4d/night-sky-shooting-star_njz-fhpbe__F0001.png') center no-repeat;
  background-size:100%;;

}

/*
Actual Code for Steering and its rotation starts here.
* Replace the wheel with our image.
*/
.flight{
  width:200px;
  height:100px;
  background:url($imgUrl) center no-repeat;
  background-size:100%;
  position:fixed;
  bottom:10%;
  right:0;
  &.run{
    animation: landFlight linear 10s;
  }
}
.runway{
  width:95%;
  height:1px;
  border-top:1px dotted #eee;
  background:#333;
  position:fixed;
  bottom:12%;
  right:0;
  .runwayNo{
    position:absolute;
    border:1px dotted #eee;
    width:50px;
    color: #fff;
    bottom:23px;
    left:-30px;
    text-align:center;
    padding:5px 0;
    &:after{
      position:absolute;
      height:20px;
      width:10px;
      border:1px dotted #fff;
      content:'';
      bottom:-23px;
      left:18px;
    }
  }
}
@keyframes landFlight {
    0% {
      @include matrix(0,0, 0deg);
    }
    20% {
      @include matrix(-400px,-1px, 0deg);
    }
    30% {
      @include matrix(-450px,-2px, 0deg);
    }
    38% {
       @include matrix(-500px,-5px, 10deg);
    }
    39% {
       @include matrix(-510px,-10px, 15deg);
    }
    40% {
       @include matrix(-520px,-12px, 20deg);
    }
    50% {
      @include matrix(-600px,-50px, 20deg);
    }
    60% {
      @include matrix(-700px,-100px, 20deg);
    }
    100% {
      @include matrix(-2000px,-750px, 20deg);
    }
}



.controls{
  button{
    border:0;
    outline:0;
    color:#000;
    background: lightskyblue;
    padding:10px;
    cursor:pointer;
  }
}

</style>
