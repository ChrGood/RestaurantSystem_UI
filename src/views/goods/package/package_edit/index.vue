<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="创建时间" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐名称" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原价(元)" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠价(元)" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内含餐品" min-width="100px">
        <template slot-scope="{row}">
          <el-popover placement="right" width="270" trigger="hover">
            <el-table :data="row.dishChoseList" max-height="300px">
              <el-table-column width="140" property="Name" label="菜品名称" />
              <el-table-column width="90" property="Price" label="价格" />
            </el-table>
            <span slot="reference">查看</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否外卖" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.isDeliver?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有货" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.isStock?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐详述" min-width="200px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.summary }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="mini" @click="open(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog title="套餐修改" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="套餐名称">
          <el-col :span="10">
            <el-input v-model="form.name" size="small" />
          </el-col>
        </el-form-item>
        <el-form-item label="选择餐品">
          <el-transfer
            v-model="chosedDish"
            style="text-align: label; display: inline-block"
            filterable
            :titles="['菜品列表', '已选菜品']"
            :button-texts="['移除', '放入']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="dishChose"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="套餐价(元)">
          <el-col :span="6">
            <el-input-number v-model="form.discount" size="small" :min="0" :max="200" label="描述文字" />
          </el-col>
          <el-col :span="6">
            <div style="color:red">原价:{{ form.price }}元</div>
          </el-col>
        </el-form-item>
        <el-form-item label="是否外卖">
          <el-switch v-model="form.isDeliver" />
        </el-form-item>
        <el-form-item label="是否有货">
          <el-switch v-model="form.isStock" />
        </el-form-item>
        <el-form-item label="套餐描述">
          <el-col :span="10">
            <el-input v-model="form.summary" type="textarea" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确 认</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getPackage, deletePackage, updatePackage } from '@/api/package'
import { getDishChose } from '@/api/dish'
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PackageEdit',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        dishName: undefined,
        dishTypeID: undefined,
        sort: ''
      },
      dialogFormVisible: false,
      form: {},
      dishChose: [],
      chosedDish: []
    }
  },
  created() {
    this.getList()
    this.getDishChose()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPackage(this.listQuery).then((response) => {
        this.list = response.Data.PackageDTOList
        this.total = response.Data.Total
        this.listLoading = false
      })
    },
    getDishChose() {
      getDishChose().then((res) => {
        var count = res.Data.length
        for (var i = 0; i < count; i++) {
          var temp = res.Data[i]
          this.dishChose.push({
            key: temp.ID,
            label: temp.Name,
            disabled: false,
            price: temp.Price
          })
        }
      })
    },
    handleChange() {
      this.form.chosedDish = this.chosedDish
      var temp = this.chosedDish
      var totalPrice = 0
      temp.forEach((x) => {
        this.dishChose.forEach((z) => {
          if (z.key === x) {
            totalPrice += z.price
          }
        })
      })
      this.form.price = totalPrice
      this.form.discount = totalPrice
    },
    handleUpdate: function(row) {
      this.dialogFormVisible = true
      this.form = Object.assign({}, row)
      this.form.chosedDish = []
      this.form.dishChoseList.forEach((element) => {
        this.chosedDish.push(element.ID)
      })
    },
    onSubmit: function() {
      updatePackage(this.form).then((res) => {
        this.dialogFormVisible = false
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    open(ID) {
      this.$confirm('此操作将删除本套餐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePackage(ID).then((res) => {
            this.$message({
              type: 'success',
              message: res.Data
            })
            this.getList()
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
