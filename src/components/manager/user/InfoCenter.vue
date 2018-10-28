<template>
  <el-container>
    <el-row>
      <el-col v-for="(essay, index) in essays" :key="essay.pk_blog" :span="24">
        <el-card shadow="hover" :body-style="cardStyle">
          <div slot="header">
            <el-row>
              <el-col :span="1">
                <img style="width: 40px;height: 40px" :src="essay.head_img">
              </el-col>
              <el-col :span="2" style="margin-top: 11px;">
                <el-tag size="small" type="info">{{essay.user_name}}</el-tag>
              </el-col>
              <el-col :span="12" style="margin-top: 9px;font-size: 20px;font-weight: bolder">
                {{essay.blog_title}}
                <i @click="praise(essay.pk_blog, index)" v-if="essay.is_praised === 1" class="fa fa-fw fa-star" style="color: darkred;cursor: pointer; font-size: 16px"></i>
                <i @click="praise(essay.pk_blog, index)" v-else class="fa fa-fw fa-star-o" style="color: darkgray;cursor: pointer; font-size: 16px"></i>
              </el-col>
              <el-col class="pull-right" :span="1" style="margin-top: 11px;">
                <i v-if="essay.praise_num >= 3" class="fa fa-fw fa-free-code-camp" style="color: orangered;font-size: 20px"></i>
              </el-col>
              <el-col :span="2" class="pull-right" style="margin-top: 15px;color: #8590A6">
                {{essay.last_time? essay.last_time.slice(0, 10) : ''}}
              </el-col>
              <el-col :span="3" class="pull-right" style="margin-top: 11px;color: #8590A6">
                <el-tag size="medium" type="info">{{essay.blog_classify}}</el-tag>
              </el-col>
            </el-row>
          </div>
          <div>
            {{essay.blog_content}}
          </div>
          <el-collapse v-model="activeNames" @change="getComments(essay.pk_blog)" style="margin-top: 20px;">
            <el-collapse-item :name="essay.pk_blog">
              <template slot="title">
                <el-tag size="small" type="warning">{{essay.praise_num}} 人赞了该话题</el-tag>
                <el-tag size="small" type="success">{{essay.comment_num}} 条评论</el-tag>
              </template>
              <el-row v-for="item in commentInfo" :key="item.pk_comment" v-loading>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="1">
                      <img style="width: 35px;height: 35px" :src="item.head_img">
                    </el-col>
                    <el-col :span="1" style="margin-top: 11px;">
                      <el-tag size="mini" type="info">{{item.user_name}}</el-tag>
                    </el-col>
                    <el-col :span="2" class="pull-right">
                      <span style="color: #8590A6">{{item.cm_time}}</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24" style="font-size: 16px;margin-left: 10px">
                  {{item.cm_content}}
                </el-col>
              </el-row>
              <el-row>
                <el-input v-model="commentContent" maxlength="60">
                  <el-button slot="append" :disabled="!commentContent" @click="saveComment(essay.pk_blog, index)">发布评论</el-button>
                </el-input>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import axois from 'axios'
export default {
  name: 'InfoCenter',
  data () {
    return {
      essays: [],
      cardStyle: {
        padding: '20px'
      },
      commentInfo: [],
      userInfo: [],
      currentBlog: null,
      activeNames: [],
      commentContent: null
    }
  },
  methods: {
    /**
     * 获取评论
     * */
    getComments (pkBlog) {
      const vm = this
      vm.$set(vm, 'commentContent', null)
      vm.$set(vm, 'commentInfo', []) // 预先清空
      axois.post('/gcbin/query_comment', {pk_blog: pkBlog}).then((response) => {
        if (vm.currentBlog && vm.currentBlog === pkBlog) { // 再次点击关闭
          vm.activeNames = []
          vm.currentBlog = null
        } else {
          vm.$set(vm, 'commentInfo', response.data.data)
          vm.activeNames = [pkBlog]
          vm.currentBlog = pkBlog
        }
      })
    },
    /**
     * 获取话题
     * */
    getEssays () {
      const vm = this
      axois.post('/gcbin/query_blog', {user_name: vm.userInfo.user_name}).then((response) => {
        vm.essays = response.data.data
      })
    },
    /**
     * 点赞
     * */
    praise (pkBlog, index) {
      const vm = this
      axois.post('/gcbin/save_praise', {user_name: vm.userInfo.user_name, pk_blog: pkBlog}).then((response) => {
        if (response.data.success) {
          vm.$set(vm.essays[index], 'is_praised', 1)
          vm.$set(vm.essays[index], 'praise_num', vm.essays[index].praise_num + 1)
        } else {
          vm.$set(vm.essays[index], 'is_praised', 0)
          vm.$set(vm.essays[index], 'praise_num', vm.essays[index].praise_num - 1)
        }
      })
    },
    saveComment (pkBlog, index) {
      const vm = this
      const commentInfo = {
        pk_blog: pkBlog,
        cm_content: vm.commentContent,
        head_img: vm.userInfo.head_img,
        user_name: vm.userInfo.user_name,
        cm_time: new Date().toLocaleDateString().replace(/\//g, '-')
      }
      axois.post('/gcbin/save_comment', commentInfo).then(() => {
        vm.$set(vm, 'commentContent', null)
        vm.commentInfo.push(commentInfo)
        vm.$set(vm.essays[index], 'comment_num', vm.essays[index].comment_num + 1)
      })
    }
  },
  mounted () {
    const vm = this
    vm.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    vm.getEssays()
  }
}
</script>

<style scoped>
.el-row {
  width: 100%;
}

</style>
