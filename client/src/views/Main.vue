<template>
  <div class="main">
    <el-container class="box">
      <el-header>后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="/"
          >
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/typeList">类型列表</el-menu-item>
              <el-menu-item index="/shopList">商品列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/orderList">订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="/shopSell">商品销售</el-menu-item>
            </el-submenu>

            <el-menu-item index="/setting">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  .box {
    min-height: 100vh;
    .el-header {
      line-height: 60px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      background-color: rgb(84, 92, 100);
    }
    .el-aside {
      background-color: rgb(84, 92, 100);
      overflow: hidden;
    }
    .el-main {
      background-color: #eee;
    }
  }
}
</style>