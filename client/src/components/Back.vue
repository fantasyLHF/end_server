<template>
  <div class="back">
    <div @click="back"><i class="el-icon-arrow-left"></i>返回</div>
  </div>
</template>
<script>
export default {
  methods: {
    // 回到原来页面
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.back {
  padding: 15px;
  background-color: #fff;
  &:hover {
    color: skyblue;
  }
}
</style>