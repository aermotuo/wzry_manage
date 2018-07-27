<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './style/reset.scss';
  #app{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
</style>
