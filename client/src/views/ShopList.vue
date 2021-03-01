<template>
  <div class="typeList">
    <div class="search">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="form.user" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="form.user" placeholder="输入商品类型"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="goto('/publicNew')"
        >发布新商品</el-button
      >
      <el-button type="danger" @click="deleteSelect">删除选择</el-button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建日期" width="120">
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新日期" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleRow(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="success"
              v-if="scope.row.status == '正常' ? false : true"
              @click="start(scope.row)"
              >启用</el-button
            >
            <el-button
              type="warning"
              v-if="scope.row.status == '正常' ? true : false"
              @click="freeze(scope.row)"
              >冻结</el-button
            >
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="divide">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="6"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: "",
        region: "",
        data: "",
      },
      tableData: [],
      allData: [],
      multipleSelection: [],
    };
  },
  computed: {
    total() {
      return this.allData.length;
    },
  },
  methods: {
    //查询
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 输出行
    handleRow(row) {
      console.log(row);
    },
    // 页面跳转
    goto(path) {
      this.$router.push(path);
    },
    // 删除选择
    deleteSelect() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要删除的商品类型",
          type: "error",
        });
        return;
      }
      console.log(this.multipleSelection);

      this.multipleSelection.forEach((v) => {
        // 本地删除
        this.tableData.forEach((tv, i) => {
          if (v.typeId == tv.typeId) {
            this.tableData.splice(i, 1);
          }
        });
        this.allData.forEach((tv, i) => {
          if (v.typeId == tv.typeId) {
            this.allData.splice(i, 1);
          }
        });
        // 发起请求删除
        this.axios({
          method: "post",
          url: "/deleteType",
          data: {
            typeId: v.typeId,
          },
        })
          .then((result) => {
            console.log(result);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    // 分页点击
    pageChange(index) {
      this.tableData = this.allData.slice((index - 1) * 6, 6 + (index - 1) * 6);
      console.log(this.tableData);
      console.log(index);
    },
    // 启用
    start(data) {
      console.log(data);
      // 本地启用
      this.allData.forEach((v) => {
        if (v.typeId == data.typeId) {
          v.status = "正常";
        }
      });
      this.tableData.forEach((v) => {
        if (v.typeId == data.typeId) {
          v.status = "正常";
        }
      });
      // 发起请求
      this.axios({
        url: "/change",
        method: "post",
        data: {
          status: 0,
          typeId: data.typeId,
        },
      })
        .then((data) => {
          if (data.data.code == 11111) {
            this.$message({
              showClose: true,
              message: "改变商品类型状态成功",
              type: "success",
            });
          }
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 冻结
    freeze(data) {
      // 本地启用
      this.allData.forEach((v) => {
        if (v.typeId == data.typeId) {
          v.status = "冻结";
        }
      });
      this.tableData.forEach((v) => {
        if (v.typeId == data.typeId) {
          v.status = "冻结";
        }
      });
      // 发起请求
      this.axios({
        url: "/change",
        method: "post",
        data: {
          status: 1,
          typeId: data.typeId,
        },
      })
        .then((data) => {
          if (data.data.code == 11111) {
            this.$message({
              showClose: true,
              message: "改变商品类型状态成功",
              type: "success",
            });
          }
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm);
      //   vm.axios({
      //     method: "get",
      //     url: "/typeList",
      //   })
      //     .then((result) => {
      //       result = result.data.data;
      //       result.forEach((v) => {
      //         (v.status = v.status ? "冻结" : "正常"),
      //           (v.createdAt = v.createdAt.split("T")[0]);
      //         v.updatedAt = v.updatedAt.split("T")[0];
      //       });
      //       vm.allData = result;
      //       vm.tableData = vm.allData.slice(0, 6);
      //       console.log(result);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    });
  },
};
</script>
<style lang="less" scoped>
.typeList {
  .search {
    background-color: #fff;
    padding: 15px;
    height: 70px;
  }
  .btn {
    background-color: #fff;
    padding: 15px;
    height: 70px;
    margin-top: 10px;
  }
  .table {
    margin-top: 10px;
  }
  .divide {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
  }
}
</style>