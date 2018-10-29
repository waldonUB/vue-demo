<template>
  <div id="contentDetail"></div>
</template>

<script>
export default {
  name: 'EssayInfo',
  mounted () {
    const vm = this
    const essay = vm.$route.query.essay
    const contentDetail = document.getElementById('contentDetail')
    contentDetail.innerHTML = essay.blog_content
  }
}
</script>

<style scoped>

</style>
