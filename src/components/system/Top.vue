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
          <el-dropdown trigger="click" @command="handleCommand">
            <i class="fa fa-fw fa-steam top-icon" style="color: lightgrey;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-upload
                  action="nothing"
                  name="file"
                  ref="upload"
                  :on-change="selectType"
                  :http-request="modifyHead"
                  :accept="acceptType"
                  :auto-upload="true"
                  :multiple="false">
                  <el-tag size="medium" type="success">更换头像</el-tag>
                </el-upload>
              </el-dropdown-item>
              <el-dropdown-item command="modifyPass"><el-tag size="medium" type="info">修改密码</el-tag></el-dropdown-item>
              <el-dropdown-item command="loginout"><el-tag size="medium" type="warning">注销登录</el-tag></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
    <el-dialog :visible.sync="dialogFormVisible" title="修改密码"
               :close-on-click-modal="false" :close-on-press-escape="false"
               @close="cancel">
      <el-form :model="ruleForm" status-icon :rules="rulesPwd"
               ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="userName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="modifyPassword('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'top',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error(`两次输入密码不一致!`))
      } else {
        callback()
      }
    }
    return {
      headImg: null,
      userName: null,
      acceptType: '.jpeg,.gif,.png,.jpg,.bmp',
      dialogFormVisible: false,
      ruleForm: {
        pass: null,
        checkPass: null
      },
      rulesPwd: {
        pass: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass, required: true, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    modifyHead (file) {
      debugger
      const vm = this
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file.file)
      fileReader.onload = function (event) {
        const base64 = event.target.result
        axios.post('/gcbin/head_portrait', {base64: base64, user_name: vm.userName}).then((response) => {
          if (response.data.success) {
            window.sessionStorage.setItem('headImg', response.data.data)
            vm.$set(vm, 'headImg', response.data.data)
            vm.$notify({
              title: '操作提示',
              message: `修改头像成功`,
              type: 'success'
            })
          } else {
            vm.$notify({
              title: '操作提示',
              message: response.data.message,
              type: 'error'
            })
          }
          vm.$refs['upload'].clearFiles()
        })
      }
    },
    selectType (file, fileList) {
      const vm = this
      const fileNames = file.name.split('.')
      const fileType = fileNames[fileNames.length - 1]
      const allTypes = vm.acceptType.split(',')
      let flag = false
      for (let i = 0; i < allTypes.length; i++) {
        flag = allTypes[i].indexOf(fileType) !== -1
        if (flag) {
          break
        }
      }
      if (!flag) {
        fileList.splice(fileList.length - 1)
        vm.$notify({
          title: '操作提示',
          message: fileType + `不是有效的上传格式`,
          type: 'warning'
        })
      }
    },
    handleCommand (command) {
      const vm = this
      if (command === 'modifyPass') {
        vm.dialogFormVisible = true
      } else if (command === 'loginout') {
        vm.loginout()
      }
    },
    modifyPassword (formName) {
      const vm = this
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/gcbin/edit_password', {user_name: vm.userName, password: vm.ruleForm.pass}).then((response) => {
            if (response.data.success) {
              vm.$notify({
                title: '操作提示',
                message: `修改密码成功`,
                type: 'success'
              })
            } else {
              vm.$notify({
                title: '操作提示',
                message: response.data.message,
                type: 'warning'
              })
            }
            vm.cancel()
          })
        } else {
          return false
        }
      })
    },
    cancel () {
      const vm = this
      vm.dialogFormVisible = false
      vm.ruleForm = {
        pass: null,
        checkPass: null
      }
      vm.$refs['ruleForm'].clearValidate()
    },
    /**
     * 注销登录
     * */
    loginout () {
      const vm = this
      vm.$confirm(`是否退出登录？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        axios.post('/gcbin/login_out', {user_name: vm.userName}).then((response) => {
          if (response.data.success) {
            window.sessionStorage.setItem('userInfo', null)
            vm.$router.push({path: '/'})
            vm.$notify({
              title: '操作提示',
              message: `注销成功`,
              type: 'success'
            })
          } else {
            vm.$notify({
              title: '操作提示',
              message: response.data.message,
              type: 'warning'
            })
          }
        })
      })
    },
    /**
     * 查询会话是否失效
     * */
    querySession () {
      const vm = this
      axios.post('/gcbin/query_session', {user_name: vm.userName}).then((response) => {
        if (!response.data.success) {
          if (vm.$route.path.indexOf('manager') !== -1 || vm.$route.path.indexOf('Manager') !== -1) {
            vm.$notify({
              title: '操作提示',
              message: response.data.message,
              type: 'warning',
              duration: 0
            })
            window.sessionStorage.setItem('userInfo', null)
            vm.$router.push({path: '/'})
          }
        }
      })
    },
    /**
     * 判断是否无信息登录,先前端简单处理一下
     * */
    checkInfo () {
      const vm = this
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      if (!userInfo) {
        vm.$notify({
          title: '操作提示',
          message: `未检测到用户登录信息`,
          type: 'warning'
        })
        vm.$router.push({path: '/'})
      } else {
        const headImg = window.sessionStorage.getItem('headImg')
        if (headImg) {
          vm.headImg = headImg
        } else if (userInfo.head_img) {
          vm.headImg = userInfo.head_img
        }
        vm.userName = userInfo.user_name
      }
    }
  },
  mounted () {
    const vm = this
    vm.checkInfo()
    setInterval(function () {
      vm.querySession()
    }, 10000)
  }
}
</script>

<style scoped>
  .top-icon {
    font-size: 22px;
    cursor: pointer;
  }
  .top-left-icon {
    font-size: 55px;
    text-align: center;
    color: #DD4B39;
  }
  .el-button {
    background-color: rgba(26, 34, 38, 0.8);
    border: rgba(26, 34, 38, 0.95);
  }
</style>
