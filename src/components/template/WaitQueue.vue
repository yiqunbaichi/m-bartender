<template>
  <div class="wait_div">

    <mt-cell   style="background: white;border-top: white">
      <img style=" float: left;" slot="icon" v-lazy="terminalInfo.imageUrl" width="80" height="80">
      <div slot="title" class="r_info_div" >
        <div class="name">{{terminalInfo.name}}</div>
        <div class="address">地址:{{terminalInfo.address}}</div>
        <div class="address">前方等待....2位</div>

      </div>
      <mt-spinner class="wait_spinner" color="#26a2ff" type="double-bounce"></mt-spinner>

    </mt-cell>


  </div>
</template>
<script >
  export default {
//    props: ['terminalInfo'],
    name: 'waitqueue',
    data () {
      return {
        terminalInfo: this.$store.state.terminal
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>


<style>
  .wait_div {
    width: 100%;
    color: #26a2ff;
    margin-bottom: 10px;
    /*padding-top: 10px;*/
  }


</style>

