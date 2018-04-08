<template>
  <div class='bg_view'>


  <!--<swiper class="swiper bg_view" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" bindchange="listenSwiper"  >-->
        <!--<swiper-item   v-for="item in goods" data-productid ="{{item.productId}}"-->
                      <!--data-price ="{{item.prices[0].price}}" >-->
    <!--<template  v-for="item in goodsList">-->
          <div class="swiper-item_context">
            <div class="chosen_top">
              <img class="chosen_top_image"  :src="imageDomain+item.productPicURLs"/>
            </div>
            <div class="chosen_mid bg_gary_transparent ">
              <div class="product_name">
                {{item.productName}}
              </div>
              <div class="section">
                <div class="flex-wrp" style="flex-direction:column;	font-size: 1.1em;">
                  <div class="flex-item desc_item ">
                    <div class="desc_title">介绍：</div>

                    <div class="product_desc">{{item.productDesc}}
                    </div>

                  </div>

                  <div class="flex-item desc_item">
                    <div class="desc_title">原料:</div>
                    <div class="product_desc">
                      {{item.materialDesc}}
                    </div>
                  </div>

                  <div class="flex-item desc_item ">
                    <div class="desc_title">酒精度:</div>
                    <div class="product_desc ">
                      {{item.alcoholContent}}%Vol
                    </div>
                  </div>


                  <div class="flex-item desc_item " >

                    <div class="amount_money">
                      ￥{{item.prices[0].price}}
                    </div>
                  </div>
                  <div class="share_v"  >
                    <!--<image class='share_btn' style="margin-left: -80rpx;margin-top: 20rpx;" mode="aspectFit"  src="/images/share.png"></image>-->
                    <button class='share_btn'   style="opacity:0; float: left;" open-type='share'></button>
                  </div>
                </div>
              </div>
            <!--</div>-->

          </div>
  </div>

<!--</template>-->
        <!--</swiper-item>-->
    <!--</swiper>-->

    <div class="buy_btn" bindtap="toSettlement" >
      <div class="pink_btn" >购买</div>
    </div>
    <div class="to_diy" bindtap="toDIYDetail" >
      <div class="pink_btn" >DIY</div>
    </div>


    <!-- <text class="no_text">NO.{{currentNO}}</text> -->

  </div>

</template>

<script>
    import { Indicator } from 'mint-ui'
    var env = require('../../../../env.js')

    export default {

    data () {
      return {
        imageDomain: env.globalData.imageDomain,
        currentNO: 1,
        goodsList:[],
        item:[]
      }
    },

    components: {

    },

    methods: {
        getGoodsList: function () {
            let url = '/ws/mbartender/goodsApi/getGoodsList'
            this.axios.get(url)
                .then(response => {
                    if (response.data.resultCode === 200) {
                        this.item = response.data.resultValue[0]
//                        console.log(this.goodsList)
                    } else {
                        alert(response.data.resultDesc)
                    }
                    Indicator.close()
                }).catch(error => {
                console.log(error)
            })
        },
//

    },

    created () {
      // 调用应用实例的方法获取全局数据
      this.getGoodsList()
    }
  }
</script>

<style>
  .bg_view{
    /*height: 90%;*/
    width: 100%;
    /*background-repeat:no-repeat;*/
    /*background-size:100% 100%;*/
    /*-moz-background-size:100% 100%;*/

  }


  .swiper-item_context {
    height: 100%;
    width: 100%;
  }

  .chosen_top {
    /*height: 40%;*/
    width: 100%;
    position: relative;
    text-align: center;
    /*background-color: #fff;*/
  }



  .chosen_top_image {
    height: auto;
    width: 50%;
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .buy_btn {
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 999;
    width: 150rpx;
  }


  .to_diy {
    position: absolute;
    top: 70px;
    right: 0;
    z-index: 999;
    width: 150rpx;
  }

  .pink_btn {
    padding: 15rpx 40rpx 15rpx 40rpx;
    background-color: #fff;
    border-color: #d83177;
    border: 0px solid #d83177;
    border-radius: 20px 0 0 20px;
    text-align: center;
    color: #d83177;
  }

  .chosen_mid {
    /*top: 1px;*/
    width: 92%;
    height: 55%;
    left: 2%;
    padding: 0 2% 3% 2%;
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: 10px;
  }

  .product_name {
    width: 100%;
    margin-top: 3%;
    font-size: 45rpx;
    /* color: #d83177; */
    text-align: center;
    font-weight:bold;
  }

  .desc_item {
    margin: 5rpx 0 5rpx 0;

  }


  .product_desc {
    position: relative;
    width: 80%;
    float: left;
    text-align: left;
  }

  .desc_title {
    position: relative;
    float: left;
    width: 20%;
  }
  .share_v{
    position: absolute;
    left: 0;
    margin-left: 30rpx;
    margin-bottom: 30rpx;
    bottom: 0;
  }

  .share_v .share_btn{
    height: 80rpx;
    width: 80rpx;
    /* float: left; */
  }



  .amount_money {
    color: #d83177;
    position: relative;
    float: right;
    right: 10rpx;
    top: 15rpx;
    font-size: 45rpx;
    justify-content: center;
    align-items: center;
    text-align:center;
    display: flex;

  }
  .quantity_edit {
    position: relative;
    float: left;
    /*border:1px solid #d83177;*/
  }

  .quantity_edit .quantity {
    width: 30rpx;
    display: flex;
    margin: 0 10px 0 10px;
    justify-content: center;
    align-items: Center;
    text-align: center;
  }


</style>


