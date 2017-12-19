<template>
  <div class="page-navbar ">
    <r-waitqueue></r-waitqueue>
  detail
    {{productId}}
  </div>


</template>
<script >
  import WaitQueue from '../../template/WaitQueue.vue'

  export default {
    components: {
      'r-waitqueue': WaitQueue
    },
    data () {
      return {
        selected: '1',
        goodsList: [],
        apiDomain: 'http://api.riowine.com:8070',
        searchValue: '',
        productId: this.$route.params.id
      }
    },
    methods: {
      getData: function () {
        this.productId = this.$route.params.id
        console.log('s', this.$route.params.id)
      }
    },
    created () {
    },
    mounted: function () {
      this.getData()
    }
  }
</script>







