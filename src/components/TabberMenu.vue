<template>

  <div class="page-tabbar">
    <mt-header title="精选" style="    background-color:white;color: black">
      <router-link to="/" slot="left" >
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="page-wrap">
  <mt-tab-container class="page-tabbar-container" v-model="selected">
    <mt-tab-container-item id="精选">
      <r-goods></r-goods>
    </mt-tab-container-item>
    <mt-tab-container-item id="DIY">
      <r-sc></r-sc>
    </mt-tab-container-item>
    <mt-tab-container-item id="我的">
      <r-mine></r-mine>
    </mt-tab-container-item>
  </mt-tab-container>


  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="精选" >

      <img slot="icon" src="../assets/logo.png">
      精选
    </mt-tab-item>
    <mt-tab-item id="DIY">

      <img slot="icon" src="../assets/logo.png">
      DIY
    </mt-tab-item>
    <mt-tab-item id="我的">

      <img slot="icon" src="../assets/logo.png">
      我的
    </mt-tab-item>
  </mt-tabbar>
    </div>
  </div>
</template>

<script>
//  import Choice from './pages/choice/Choice'
  import Goods from './pages/goods/list/index'
  import DIY from './pages/sc/ShoppingCart'
  import Mine from './pages/mine/Mine'
import { Header } from 'mint-ui'

  export default {
    name: 'menu',
    data () {
      return {
        selected: '精选'

      }
    },
    components: {
//      'r-choice': Choice,
      'r-goods':Goods,
      'r-sc': DIY,
      'r-mine': Mine
    }

  }
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
  .page-content {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
</style>


