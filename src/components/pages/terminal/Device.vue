<template>
  <!--<div class="page-navbar ">-->

  <div style="width: 100%;height:100%">


  <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="allmap">
    <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
  </el-amap>

    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup">
      <div style="width: 100%">
          <!--<mt-cell > :to="{name:'choice' , params: {terminalInfo: terminalInfo}}"-->
        <mt-cell @click.native="gotoGoodsList">
             <img style=" float: left;" slot="icon" v-lazy="terminalInfo.imageUrl" width="80" height="80">
            <div slot="title" class="r_info_div" >
              <div class="name">{{terminalInfo.name}}</div>
              <div class="address">地址:{{terminalInfo.address}}</div>
            </div>
              <a>{{terminalInfo.distance>1?terminalInfo.distance+'km':terminalInfo.distance*1000+'m'}}</a>
          </mt-cell>
      </div>
    </mt-popup>
</div>



</template>


<script >
  import { Indicator } from 'mint-ui'
  import { amapManager } from 'vue-amap'
  import * as types from '../../../store/types'
  import { Toast } from 'mint-ui';
  export default {
    components: { },
    data () {
      let self = this
      return {terList: [],
        popupVisible4: false,
        terminalInfo: [],
        amapManager,
        center: [120.10885, 30.31591],
        lng: 0,
        lat: 0,
        zoom: 13,
        loaded: false,
        events: {
          init: (o) => {
            o.getCity(result => {
//              console.log(result)
            })
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {
//            alert('map clicked')
          }
        },
        markers: [],
        windows: [],
        plugin: ['ToolBar', {
          pName: 'Geolocation',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          },
          showCircle: true
        }
        ]
      }
    },
    created () {
      Indicator.open()
      this.getTerminalInfo()
    },
    methods: {
      onDateChange (picker, values) {
//        alert(1)
      },
      getTerminalInfo: function () {
        let url = '/ws/mbartender/terminalApi/terminalInfo?longitude=120.11885&latitude=30.32591'
        this.axios.get(url)
          .then(response => {
            if (response.data.resultCode === 200) {
              this.terList = response.data.resultValue
              for (var i in this.terList) {
                let obj = this.terList[i]
                let marker = {
                  obj: this.terList[i],
                  position: [this.terList[i].gps[0], this.terList[i].gps[1]],
                  events: {
                    click: () => {
                      this.popupVisible4 = true
                      this.terminalInfo = obj
                    }
                  }
                }
                this.markers.push(marker)
              }
            } else {
                Toast({
                    message: response.data.resultDesc,
                    position: 'bottom',
                    duration: 5000
                });
            }
            Indicator.close()
          }).catch(error => {
            console.log(error)
          })
      },
      gotoGoodsList: function () {
        this.$store.commit(types.TERMINAL, this.terminalInfo)
        this.$router.push({name: 'choice'})
      }
    }

  }
</script>


<style>
  .allmap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    position: absolute;
    bottom: 0
  }
  .mint-popup {
    width:100%;
    z-index: 999;
  }

  .r_info_div{
    float: left;
    height: 100%;
    width: 70%;
    padding-top: 10px;
    -webkit-box-align: center;
  }
  .name {
    margin-top: 2vh;
    width: 100%;
    font-size: 12pt;
    color: black;
  }

  .address{
    margin-top: 2vh;
    width: 100%;
    font-size: 8pt;
    color: deepskyblue;
  }


</style>



