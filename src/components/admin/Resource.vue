<template>
  <el-container>
    <el-header><top></top></el-header>
    <el-container>
      <el-aside width="220px" style="overflow: auto"><left-menu></left-menu></el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from '../system/LeftMenu'
import top from '../system/Top'

export default {
  name: 'Resource',
  components: {leftMenu, top}
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: rgba(26, 34, 38, 0.95);
    color: #F6F6F6;
    line-height: 60px;
  }

  .el-aside {
    background-color: #222D32;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 300px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
