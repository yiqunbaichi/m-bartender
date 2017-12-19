<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div>
    <router-view></router-view>
    </div>

  </div>
</template>

<script>
//  import {mapState} from 'vuex'
  export default {
    components: {
    },
    name: 'app'
//    computed: mapState({
//      title: state => state.title,
//      token: state => state.token,
//      user: state => state.user
//    }),
//    data () {
//      return {
//        selected: '精选'
//      }
//    }
//    ,
//    components: {
//      'r-tabber': Header
//    }

  }
</script>

<style>
 body {
   margin: 0;
    /*height: 100%;*/
    /*-webkit-tap-highlight-color: transparent;*/
    /*-ms-text-size-adjust: 100%;*/
    /*-webkit-text-size-adjust: 100%;*/
    /*line-height: 1.6;*/
    /*font-family: -apple-system-font, "Helvetica Neue", sans-serif;*/
    /*background-image: url('./assets/common_bg_01.png');*/
    /*background-size:100% auto;*/
  }
  /*.bg{*/
    /*background-color:transparent*/
  /*}*/
</style>


