<template>
  <div class="w-manage flex-row">
    <div class="flex-item w-manage__left">
      <div class="w-manage__tabs">
        <div class="w-manage__tab" v-for="(item) in tabs" v-text="item.name" :key="item">
          <i ></i>
        </div>
      </div>
    </div>
    <div class="flex-item w-manage__right"></div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        tabs: [
          {
            name: '战队配置'
          },
          {
            name: '战队人员'
          },
          {
            name: '代打登记'
          }
        ]
      }
    }
  }
</script>
<style scoped>
.w-manage,.w-manage__left,.w-manage__right{
  height:100%;
}
.w-manage__left{
  flex: 0 0 15%;
  background-color:#464c5b;
}
.w-manage__right{
  flex: 0 0 85%;
}
.w-manage__tab{
  font-size: 16px;
  color:#9ea7b4;
}
</style>
