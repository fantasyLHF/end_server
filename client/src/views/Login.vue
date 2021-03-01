<template>
  <div class="login">
    <div class="title">后台管理系统</div>
    <div class="form">
      <div class="type">欢迎登录！</div>
      <div class="myinput">
        <span class="el-icon-user"></span
        ><input
          autocomplete="off"
          type="text"
          placeholder="请输入邮箱"
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
      <div class="right">忘记密码?</div>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="right" @click="goto('/ral/register')">立即注册</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 登录
    login() {
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
      console.log(this.form.email);
      console.log(this.form.password);
      this.axios({
        method: "post",
        url: "/login",
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      })
        .then((data) => {
          console.log(data);

          if (data.data.code == 1111) {
            this.$message({
              showClose: true,
              message: data.data.msg,
              type: "success",
            });
            this.$cookies.set("String", data.data.data, "1d");
            this.$router.push("/");
            return;
          }
          this.$message({
            showClose: true,
            message: data.data.msg,
            type: "error",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goto(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 500px;
  height: 350px;
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
      &:nth-child(2) {
        margin-top: 20px;
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
    .right {
      color: skyblue;
      text-align: right;
      font-size: 12px;
      cursor: pointer;
      margin-top: 5px;
    }
  }
}
</style>