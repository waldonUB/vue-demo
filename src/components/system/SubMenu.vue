<template slot="subMenu">
  <el-submenu :index="item.funcode" :key="item.pk_resource" v-if="item.children">
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
</template>

<script>
export default {
  name: 'sub-menu',
  props: ['item'],
  data () {
    return {
      url: null
    }
  },
  watch: {
    url () {
      console.log('url' + this.url)
      if (this.$route.path) {}
    }
  }
}
</script>

<style scoped>

</style>
