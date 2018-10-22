<template>
  <el-row :gutter="20">
    <el-col :span="3" class="top-left-icon">
      <i class="fa fa-fw fa-vimeo"></i>
    </el-col>
    <el-col :span="6" class="pull-right">
      <el-row :gutter="20">
        <el-col :span="3">
          <i class="fa fa-fw fa-envelope-o top-icon" style="color: lightgreen"></i>
        </el-col>
        <el-col :span="3">
          <i class="fa fa-fw fa-bell-o top-icon" style="color: red"></i>
        </el-col>
        <el-col :span="3">
          <i class="fa fa-fw fa-flag-o top-icon" style="color: darkorange"></i>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <el-button circle>
                <img v-bind:src="headImg" style="height: 33px;width: 33px">
              </el-button>
            </el-col>
            <el-col :span="12">
              {{userName}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <i class="fa fa-fw fa-steam top-icon" style="color: lightgrey"></i>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      headImg: null,
      userName: null
    }
  },
  mounted () {
    const vm = this
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    if (userInfo.head_img) {
      vm.headImg = userInfo.head_img
    }
    vm.userName = userInfo.user_name
  }
}
</script>

<style scoped>
  .top-icon {
    font-size: 22px;
  }
  .top-left-icon {
    font-size: 55px;
    text-align: center;
    color: #DD4B39;
  }
</style>
