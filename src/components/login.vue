<template>
  <div class="login">
    <div class="login-main">
      <el-row>
        <el-col :span="24">
          <el-input
            placeholder="请输入账号"
            prefix-icon="fa fa-fw fa-user-o">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input
          placeholder="请输入密码"
          prefix-icon="fa fa-fw fa-key">
        </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <button class="login-button">登录</button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <button class="login-button">注册</button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="success" icon="fa fa-fw fa-wechat" circle></el-button>
          <el-button type="primary" icon="fa fa-fw fa-qq" circle></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
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
