<template>
  <el-container>
    <el-header style="margin-top: 30px">
      <el-input placeholder="请输入内容" v-model="essayTitle" maxlength="60">
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
      <el-button type="primary" size="small" @click="previewEssay" :disabled="allowSave">预览</el-button>
      <el-button type="success" size="small" @click="saveEssay" :disabled="allowSave">发布杂谈</el-button>
    </el-footer>
    <el-dialog :visible.sync="dialogTableVisible" @open="openDialog" ref="dialog" width="80%">
      <div slot="title">
        <el-row>
          <el-col style="text-align: center;font-size: 22px; font-weight: bolder">
            {{essayTitle}}
          </el-col>
          <el-col>
            <el-tag size="small" type="warning" class="pull-right">{{essayClassify}}</el-tag>
          </el-col>
        </el-row>
        <div id="preview" class="preview"></div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import E from 'wangeditor'
import axios from 'axios'
export default {
  name: 'Essay',
  computed: {
    allowSave () {
      const vm = this
      return !(vm.essayTitle && vm.essayClassify && vm.editorHtml)
    }
  },
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
    openDialog () {
      const preview = document.getElementById('preview')
      preview.innerHTML = this.editorHtml
      const dialog = this.$refs.dialog
      console.log(dialog)
    },
    previewEssay () {
      this.dialogTableVisible = true
    },
    saveEssay () {
      const vm = this
      const data = {
        blog_title: vm.essayTitle,
        blog_content: vm.editorHtml,
        blog_classify: vm.essayClassify,
        cuserid: vm.userInfo.cuserid,
        user_name: vm.userInfo.user_name,
        head_img: vm.userInfo.head_img
      }
      axios.post('/gcbin/save_question', data).then((response) => {
        if (response.data.success) {
          vm.$notify({
            title: '操作提示',
            message: `发布成功`,
            type: 'success'
          })
        } else {
          vm.$notify({
            title: '操作提示',
            message: `发布失败` + response.data.message,
            type: 'error'
          })
        }
      })
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
