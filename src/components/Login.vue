<template ref="login">
  <div class="login">
    <div class="login-main" v-if="isRegister">
      <el-row>
        <el-col :span="24">
          <el-input v-model="userModel.user_name" class="trans-input"
            placeholder="请输入账号"
            prefix-icon="fa fa-fw fa-user-o">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="userModel.password" class="trans-input"
            placeholder="请输入密码" type="password"
            prefix-icon="fa fa-fw fa-key">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <button class="login-button" @click="login">登录</button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <button class="login-button" @click="register">注册</button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="success" icon="fa fa-fw fa-wechat" circle></el-button>
          <el-button type="primary" icon="fa fa-fw fa-qq" circle></el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog class="trans-dialog" title="-" :visible.sync="dialogVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" width="30%" @close="dialogClose">
      <el-form :model="registerModel" :rules="registerRules" ref="registerForm">
        <el-form-item prop="user_name">
          <el-col :span="24">
            <el-input v-model="registerModel.user_name" class="trans-input"
                      placeholder="请输入账号"
                      prefix-icon="fa fa-fw fa-user-o">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="password">
          <el-col :span="24">
            <el-input v-model="registerModel.password" class="trans-input"
                      placeholder="请输入密码" type="password"
                      prefix-icon="fa fa-fw fa-key">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="password2">
          <el-col :span="24">
            <el-input v-model="registerModel.password2" class="trans-input"
                      placeholder="请确认密码" type="password"
                      prefix-icon="fa fa-fw fa-key">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="district">
          <el-col :span="24">
            <el-input v-model="registerModel.district" class="trans-input"
                      placeholder="请输入地址"
                      prefix-icon="fa fa-fw fa-globe">
            </el-input>
          </el-col>
        </el-form-item>
        <el-row style="margin-bottom: 0">
          <el-col :span="24">
            <span style="color: white">正在定位您的位置：</span>
            <i class="fa fa-fw fa-spinner fa-spin" style="color: orange"></i>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 0">
          <el-col :span="24">
            <el-button type="success" size="medium" class="pull-right" @click="saveUser">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      dialogVisible: false,
      isRegister: true,
      userModel: {
        user_name: null,
        password: null
      },
      registerModel: {
        user_name: null,
        password: null,
        password2: null,
        district: null
      },
      registerRules: {
        user_name: [
          { required: true, message: '账号为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码为空', trigger: 'change' }
        ],
        password2: [
          { required: true, message: '确认密码为空', trigger: 'change' }
        ],
        district: [
          { required: true, message: '地区为空', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    login () {
      const vm = this
      if (!vm.userModel.user_name) {
        vm.$message(`账号为空`)
        return
      }
      if (!vm.userModel.password) {
        vm.$message(`密码为空`)
        return
      }
      axios.post('/gcbin/login_validate', vm.userModel).then((response) => {
        if (response.data.success) {
          vm.$store.commit('getUserInfo', response.data.data) // 只能存在运存当中，暂时不考虑
          window.sessionStorage.setItem('userInfo', JSON.stringify(response.data.data))
          vm.$router.push({path: 'manager'})
        } else {
          vm.$message(response.data.message)
        }
      })
    },
    /**
     * 打开注册的dialog
     * */
    register () {
      console.log()
      const vm = this
      vm.isRegister = false
      vm.dialogVisible = true
    },
    /**
     * dialog关闭回调
     * */
    dialogClose () {
      const vm = this
      vm.isRegister = true
      vm.$refs['registerForm'].resetFields()
    },
    /**
     * 保存注册用户
     * */
    saveUser () {
      const vm = this
      vm.$refs['registerForm'].validate((valid) => {
        if (!valid) {
          return
        }
        if (vm.registerModel.password === vm.registerModel.password2) {
          axios.post('/gcbin/register', vm.registerModel).then((response) => {
            if (response.data.success) {
              vm.$confirm(`是否直接登录？`, `注册成功`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                vm.$set(vm.userModel, 'user_name', vm.registerModel.user_name)
                vm.$set(vm.userModel, 'password', vm.registerModel.password)
                vm.login()
              })
            } else {
              vm.$message(response.data.message)
            }
          })
        } else {
          vm.$message(`密码不一致`)
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  height: 100%;
  background-image: url(../assets/loginBg.jpg);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.login-main{
  text-align: center; /*让div内部文字居中*/
  background-color:rgba(255, 255, 255, 0);
  border-radius: 20px;
  width: 300px;
  height: 250px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-button{
  width: 100%;
  height: 35px;
  color: white;
  font-size: large;
  background-color: #566374;
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
}
.el-row{
  margin-bottom: 20px;
}
</style>
