<template>
  <button @click="postTest">测试路径</button>
</template>

<script>
import axios from 'axios'

export default {
  name: 'elementTest',
  data () {
    return {
      userInfo: []
    }
  },
  methods: {
    postTest () {
      const url = '/gcbin/singleTest'
      console.log(`测试地址` + url)
      axios.post(url + '?str=' + 'xixixi').then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
