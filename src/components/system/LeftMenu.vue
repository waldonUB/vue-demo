<template>
<!--废弃-->
<el-row>
  <el-col :span="24">
    <el-menu
      :router="true"
      background-color="#1A2226"
      :unique-opened="true"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="item.funcode" v-for="item in rootInfo" :key="item.pk_resource" v-if="item.children">
        <template slot="title">
          <i :class="item.resicon" class="fa-fw"></i>
          <span>{{item.funname}}</span>
        </template>
        <sub-menu :item="subItem" v-for="subItem in item.children" :key="subItem.pk_resource"></sub-menu>
      </el-submenu>
      <el-menu-item :index="item.funcode" v-else route="../system/LeftMenu">
        <template slot="title">
          <i :class="item.resicon" class="fa-fw"></i>
          <span>{{item.funname}}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios'
import subMenu from './SubMenu'
export default {
  name: 'left-menu',
  components: {subMenu},
  data () {
    return {
      userInfo: {},
      rootInfo: [],
      menuInfo: []
    }
  },
  methods: {
    queryPermissionTree () {
      const vm = this
      axios.post('/gcbin/permission/queryPermissionTree', {groupCode: vm.userInfo.group_code}).then((response) => {
        vm.menuInfo = response.data.data
        vm.menuInfo.forEach((item, index) => {
          if (item.pk_parent === 0) {
            vm.addChildren(item)
            vm.rootInfo.push(item)
          }
        })
        console.log(`权限数据为：` + vm.rootInfo)
      })
    },
    addChildren (item) {
      const vm = this
      vm.menuInfo.forEach((subItem, index) => {
        if (subItem.pk_parent === item.pk_resource) {
          if (!item.children) {
            item.children = []
          }
          item.children.push(subItem)
          vm.addChildren(subItem)
        }
      })
    }
  },
  mounted () {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.queryPermissionTree()
  }
}
</script>

<style scoped>
.el-menu {
  background-color: rgba(255, 255, 255, 0);
}
</style>
