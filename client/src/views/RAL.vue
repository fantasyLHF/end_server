<template>
  <div class="register">
    <div class="box">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "RAL",
};
</script>
<style lang="less" scoped>
.register {
  height: 100vh;
  width: 100%;
  background: url("../assets/img/bigBg.jpeg") no-repeat center;
  background-size: cover;
  .box {
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>