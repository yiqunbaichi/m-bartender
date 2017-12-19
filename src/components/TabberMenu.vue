<template>


      <!--<ul class="menu-list">-->
        <!--<li><router-link to="/index/choice" exact>精选</router-link></li>-->
        <!--<li><router-link to="/index/shoppingcart" exact>购物车</router-link></li>-->
        <!--<li><router-link to="/index/mine" exact>我的</router-link></li>-->
      <!--</ul>-->
  <div class="page-tabbar">
    <div class="page-wrap">
  <mt-tab-container class="page-tabbar-container" v-model="selected">
    <mt-tab-container-item id="精选">
      <r-choice></r-choice>
    </mt-tab-container-item>
    <mt-tab-container-item id="购物车">
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
    <mt-tab-item id="购物车">

      <img slot="icon" src="../assets/logo.png">
      发现
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
  import Choice from './pages/choice/Choice'
  import SC from './pages/sc/ShoppingCart'
  import Mine from './pages/mine/Mine'
  export default {
    name: 'menu',
    data () {
      return {
        selected: '精选'

      }
    },
    components: {
      'r-choice': Choice,
      'r-sc': SC,
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


