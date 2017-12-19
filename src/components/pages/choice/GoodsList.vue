<template>

  <div class="page-navbar ">

  <template id="temp-tab01">
    <r-waitqueue ></r-waitqueue>
    <!--<mt-search class="r_mint-search" v-model="searchValue"></mt-search>-->
    <template v-for="item in goodsList"   >
      <router-link :to="{name:'detail' , params: {id: item.productId}}" >
      <mt-cell  is-link >
        <img style=" float: left;" slot="icon" v-lazy="apiDomain+item.productPicUrlAll" width="70" height="100">
        <div slot="title" class="r_goods_div" >
          <div class="r_goods_name">{{item.productName}}</div>
          <div class="alcoholContent">酒精度:{{item.alcoholContent}}Vol</div>
          <div class="r_goods_desc">配方:{{item.materialDesc}}</div>
        </div>
        <!--<a class="r_goods_price">单价:{{item.prices[0].price}}</a>-->
      </mt-cell>
      </router-link>
    </template>
  </template>


  </div>
</template>


<script >
  import { Indicator } from 'mint-ui'
  import WaitQueue from '../../template/WaitQueue.vue'

  export default {
    components: {
      'r-waitqueue': WaitQueue
    },
    data () {
      return {
        terminalInfo: '',
        selected: '1',
        goodsList: [],
        apiDomain: 'http://api.riowine.com:8070',
        searchValue: ''
      }
    },
    created () {
      Indicator.open()
      this.getGoodsList()
    },
    methods: {
      getGoodsList: function () {
        let url = '/ws/mbartender/goodsApi/getGoodsList'
        this.axios.get(url)
          .then(response => {
            if (response.data.resultCode === 200) {
              this.goodsList = response.data.resultValue
            } else {
              alert(response.data.resultDesc)
            }
            Indicator.close()
          }).catch(error => {
            console.log(error)
          })
      }
    }

  }
</script>

<style>
  .page-navbar{
    padding-bottom: 18vh;
  }
  .r_mint-search {
    height: 0;
    height: 100%;
    position: relative;
  }
  .r_goods_div{
    float: left;
    height: 100%;
    width: 70%;
    padding-top: 10px;
    -webkit-box-align: center;
  }
  .r_goods_name {
    margin-top: 1vh;
    width: 100%;
    font-size: 12pt;
    color: black;
  }
  .r_goods_desc {
    width: 100%;
    margin-top: 2vh;
    margin-bottom: 2vh;
    color: darkgrey;
    line-height: 120%;
    font-size: 8pt;
  }

  .alcoholContent{
    margin-top: 2vh;
    width: 100%;
    font-size: 8pt;
    color: deepskyblue;

  }

</style>






