<template>
  <div class="inlet flex-col">
    <h1>页面入口如下：</h1>
    <div class="item">
      <router-link to="interview-situation">面试情况</router-link>
    </div>
    <div class="item">
      <router-link to="information-statistics">资料统计</router-link>
    </div>
  </div>
</template>

<script>
export default{
  name: 'HelloWorld',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.inlet {
  height: 100vh;
  padding-top: 80px;
  text-align: center;
  h1 {
    margin-bottom: 50px;
  }
  .item {
    margin-top: 30px;
  }
}


</style>
