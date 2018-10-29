<template>
  <el-container>
    <el-header style="margin-top: 30px">
      <el-input placeholder="请输入内容" v-model="essayTitle">
        <template slot="prepend">杂谈标题</template>
      </el-input>
    </el-header>
    <el-main>
      <div ref="editor"></div>
      <el-select v-model="essayClassify" filterable placeholder="分类选择" value="" style="margin-top: 10px">
        <el-option
          v-for="item in classifies"
          size="mini"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-main>
    <el-footer>
      <el-button type="primary" size="small" @click="saveEssay">预览</el-button>
      <el-button type="success" size="small" @click="saveEssay">发布杂谈</el-button>
    </el-footer>
    <el-dialog :visible.sync="dialogTableVisible" @open="openDialog" ref="dialog" width="80%">
      <div slot="title">
        <div id="preview" class="preview"></div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Essay',
  data () {
    return {
      userInfo: null,
      essayTitle: null,
      editorHtml: null,
      editorText: null,
      editorJSON: null,
      essayClassify: null,
      classifies: [{ // 游戏分类
        value: '英雄联盟',
        label: '英雄联盟'
      }, {
        value: '绝地求生',
        label: '绝地求生'
      }, {
        value: '王者荣耀',
        label: '王者荣耀'
      }, {
        value: '刺激战场',
        label: '刺激战场'
      }, {
        value: '阴阳师',
        label: '阴阳师'
      }],
      dialogTableVisible: false
    }
  },
  methods: {
    saveEssay () {
      console.log(this.editorHtml)
      console.log(this.editorHtml.length)
      console.log(this.editorText)
      console.log(this.editorJSON)
      this.dialogTableVisible = true
    },
    openDialog () {
      const preview = document.getElementById('preview')
      preview.innerHTML = this.editorHtml
      const dialog = this.$refs.dialog
      console.log(dialog)
    }
  },
  mounted () {
    const vm = this
    vm.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const editor = new E(vm.$refs.editor)
    editor.customConfig.uploadImgShowBase64 = true // base64保存本地图片
    // editor.customConfig.pasteIgnoreImg = true // 忽略粘贴内容中的图片
    editor.customConfig.pasteFilterStyle = true // 关闭粘贴样式的过滤
    editor.customConfig.zIndex = 0
    editor.customConfig.onchange = (html) => {
      vm.editorHtml = html
      vm.editorText = editor.txt.text()
      vm.editorJSON = editor.txt.getJSON()
    }
    editor.create()
  }
}
</script>

<style scoped>
.el-container {
  background-color: #F6F6F6;
}
</style>
