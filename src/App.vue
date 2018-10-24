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

<style>
  html, body {
    height: 100%;
    max-height: 100%;
    overflow: auto;
    margin: 0;
  }
  /**透明输入框*/
  .trans-input > input{
    background-color: rgba(255, 255, 255, 0) !important;
    color: white !important;
  }
  .trans-dialog > .el-dialog{
    background-color: rgba(46, 64, 84, 0.3) !important;
  }
  .el-dialog__body{
    padding-top: 0;
  }
  #app {
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
