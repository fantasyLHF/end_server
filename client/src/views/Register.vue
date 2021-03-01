<template>
  <div class="login">
    <div class="title">后台管理系统</div>
    <div class="form">
      <div class="type">欢迎注册！</div>
      <div class="myinput">
        <span class="el-icon-user"></span
        ><input
          autocomplete="off"
          type="text"
          placeholder="请输入用户名"
          v-model="form.email"
        />
      </div>
      <div class="myinput">
        <span class="el-icon-lock"></span
        ><input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </div>
      <div class="myinput">
        <span class="el-icon-lock"></span
        ><input
          type="password"
          placeholder="请输入确认密码"
          v-model="form.againpassword"
        />
      </div>
      <div class="send">
        <input type="text" v-model="form.code" />
        <button @click="sendCode" ref="send">发送验证码</button>
      </div>
      <div class="btn">
        <el-button type="primary" @click="register">注册</el-button>
      </div>
      <div class="tips" @click="goto('/ral')">已有账号,去登录</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        againpassword: "",
        code: "",
      },
      timer: "",
    };
  },
  methods: {
    // 注册
    register() {
      //判断数据是否为空
      for (let key in this.form) {
        if (this.form[key] == "") {
          this.$message({
            showClose: true,
            message: "数据不能为空",
            type: "error",
          });
          return;
        }
      }
      // 判断邮箱是否符合
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!emailReg.test(this.form.email)) {
        this.$message({
          showClose: true,
          message: "邮箱不符合规则",
          type: "error",
        });
        return;
      }
      if (this.form.password != this.form.againpassword) {
        this.$message({
          showClose: true,
          message: "两次密码不相等",
          type: "error",
        });
        return;
      }
      console.log("开始注册");
      // 发起发送验证码请求

      this.axios({
        method: "post",
        url: "/register",
        data: {
          email: this.form.email,
          password: this.form.password,
          code: this.form.code,
        },
      })
        .then((result) => {
          console.log(result);
          if (result.data.code == 1220) {
            this.$message({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
            this.$refs.send.disabled = false;
            this.$refs.send.innerHTML = "发送验证码";
            clearInterval(this.timer);
            this.$router.push("/ral");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 发送验证码
    sendCode() {
      // 判断邮箱是否符合
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!emailReg.test(this.form.email)) {
        this.$message({
          showClose: true,
          message: "邮箱不符合规则",
          type: "error",
        });
        return;
      }
      console.log("邮箱正确发送验证码");
      console.log(this.form.email);
      // 发起发送验证码请求
      this.axios({
        method: "post",
        url: "/sendValidCode",
        data: {
          email: this.form.email,
        },
      })
        .then((result) => {
          console.log(result);
          // 发送按钮转变
          this.$refs.send.disabled = true;
          this.$refs.send.innerHTML = "30秒后重新发送";
          let time = 30;
          this.timer = setInterval(() => {
            time--;
            this.$refs.send.innerHTML = time + "秒后重新发送";
            if (time == 0) {
              this.$refs.send.disabled = false;
              this.$refs.send.innerHTML = "发送验证码";
              clearInterval(this.timer);
            }
          }, 1000);
          if (result.data.code == 10022) {
            this.$message({
              showClose: true,
              message: "验证码发送成功",
              type: "success",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 返回登录页面
    goto(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 500px;
  height: 500px;
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #fff;
  }
  .form {
    padding: 40px;
    .type {
      color: #fff;
    }
    .myinput {
      display: flex;
      align-items: center;
      background-color: #fff;
      text-align: center;
      height: 40px;
      margin-top: 20px;
      &:nth-child(1) {
        margin-top: 0px;
      }
      span {
        width: 40px;
      }
      input {
        border: none;
        outline: none;
      }
    }

    .btn {
      margin-top: 30px;
      width: 100%;
      .el-button {
        width: 100%;
      }
    }
    .tips {
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
    .send {
      margin-top: 20px;
      height: 40px;
      display: flex;
      input {
        flex: auto;
        border: none;
        outline: none;
      }
      button {
        border: none;
        width: 120px;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>