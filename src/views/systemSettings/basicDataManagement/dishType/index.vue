<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="菜品类别">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">确    认</el-button>
        <el-button type="primary" size="mini" @click="onCancel">取    消</el-button>
      </el-form-item>
    </el-form>
    <el-divider style="">菜品类别列表</el-divider>
    <el-table
      v-loading="listLoading"
      :data="dishTypeList"
      border
      fit
      highlight-current-row
      style="width: 95%;"
    >
      <el-table-column label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.CreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别名称">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包含菜品">
        <template slot-scope="{row}">
          <el-popover placement="right" width="270" trigger="hover">
            <el-table :data="row.DishDTO_list" max-height="300px">
              <el-table-column width="140" property="Name" label="菜品名称" />
              <el-table-column width="90" property="Price" label="价格" />
            </el-table>
            <span slot="reference">查看</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="mini" @click="open(row.ID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form1" label-width="150px">
        <el-form-item label="菜品类别">
          <el-col :span="10">
            <el-input v-model="form1.Name" size="small" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1(form1)">确 认</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getDishTypeAndDish, inputDishType, RemoveDishTypeIncludeDish, UpdateDishType } from '@/api/dish'
export default {
  name: 'DishTypeManagement',
  data() {
    return {
      form: {
        name: ''
      },
      form1: {

      },
      dishTypeList: [],
      listLoading: false,
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDishTypeAndDish().then(res => {
        this.dishTypeList = res.Data
      })
      this.listLoading = false
    },
    onSubmit() {
      inputDishType(this.form).then(res => {
        this.$message({
          message: res.Data,
          type: 'success'
        })
        this.fetchData()
      })
    },
    onSubmit1(data) {
      UpdateDishType(data).then((res) => {
        this.dialogFormVisible = false
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.dialogFormVisible = false
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.form1 = Object.assign({}, row)
    },
    open(ID) {
      this.$confirm('将删除本菜品类别(包括本类别下所有菜品), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          RemoveDishTypeIncludeDish(ID).then((res) => {
            this.$message({
              type: 'success',
              message: res.Data
            })
            this.fetchData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
