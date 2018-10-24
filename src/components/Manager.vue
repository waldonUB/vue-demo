<template>
  <el-container>
    <el-header><top></top></el-header>
    <el-container>
      <el-aside width="220px" style="overflow: auto">
        <el-row>
          <el-col :span="24">
            <el-menu
              :router="true"
              :default-active="$route.path"
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
              <el-menu-item :index="item.funcode" :route="'/manager' + item.urls" v-else>
                <template slot="title">
                  <i :class="item.resicon" class="fa-fw"></i>
                  <span>{{item.funname}}</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

import axios from 'axios'
import top from '@/components/system/Top'
import subMenu from '@/components/system/SubMenu'

export default {
  name: 'manager',
  components: {top, subMenu},
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
    console.log(this.$route.path)
  }
}
</script>

<style scoped>
  .el-menu {
    background-color: rgba(255, 255, 255, 0);
  }
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
    padding: unset;
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
