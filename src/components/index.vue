<template>
  <div>
    <router-view></router-view>
    <tabber-menu></tabber-menu>
  </div>
</template>
<script>
  import TabberMenu from './TabberMenu.vue'

  export default {
    name: 'index',
    components: { TabberMenu }
}
</script>
