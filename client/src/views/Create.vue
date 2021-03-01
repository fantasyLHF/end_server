<template>
  <div class="create">
    <Back />
    <div class="box">
      <el-form :model="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="form.name" placeholder="输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="正常"></el-radio>
            <el-radio label="冻结"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Back from "../components/Back";
export default {
  name: "Create",
  data() {
    return {
      form: {
        name: "",
        resource: "",
      },
    };
  },
  components: {
    Back,
  },
  methods: {
    // 立即创建
    submitForm() {
      if (this.form.name == "") {
        this.$message({
          showClose: true,
          message: "请输入类型名称",
          type: "error",
        });
        return;
      }
      if (this.form.resource == "") {
        this.$message({
          showClose: true,
          message: "请选择对应状态",
          type: "error",
        });
        return;
      }
      console.log(this.form);
      let status = "";
      if (this.form.resource == "正常") {
        status = 0;
      } else {
        status = 1;
      }
      // 发起创建请求
      this.axios({
        method: "post",
        url: "/create",
        data: {
          status: status,
          name: this.form.name,
        },
      })
        .then((result) => {
          if (result.data.code == 11011) {
            this.$message({
              showClose: true,
              message: "商品类型创建成功",
              type: "success",
            });
            this.$router.back();
            return;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.create {
  .box {
    margin-top: 10px;
    background-color: #fff;
    padding: 15px;
    /deep/.el-input__inner {
      width: 240px;
    }
  }
}
</style>