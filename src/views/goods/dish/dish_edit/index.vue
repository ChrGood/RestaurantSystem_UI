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
          <span>{{ row.CreatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.ImagePath"
            :fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column label="类别" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.dishTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格(元)" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.Price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否半份销售" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.IsHalf?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否外卖" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.IsDeliver?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有货" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.IsStock?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货品详述" min-width="200px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.Summary }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="mini" @click="open(row.ID)">删除</el-button>
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

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="150px">
        <el-form-item label="菜品名称">
          <el-col :span="10">
            <el-input v-model="form.Name" size="small" />
          </el-col>
        </el-form-item>
        <el-form-item label="菜品类别">
          <el-select v-model="form.DishTypeID" placeholder="选择菜品类别" size="small">
            <el-option v-for="item in dishType" :key="item.ID" :label="item.Name" :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜品价格(元)">
          <el-input-number v-model="form.Price" size="small" :min="1" :max="200" label="描述文字" />
        </el-form-item>
        <el-form-item label="可否半分">
          <el-switch v-model="form.IsHalf" />
        </el-form-item>
        <el-form-item label="是否外卖">
          <el-switch v-model="form.IsDeliver" />
        </el-form-item>
        <el-form-item label="是否有货">
          <el-switch v-model="form.IsStock" />
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-col :span="10">
            <el-input v-model="form.Summary" type="textarea" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">确 认</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDishList, updateDish, deleteDish } from '@/api/dish'
// import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DishEdit',
  components: { Pagination },
  data() {
    return {
      fit: 'cover',
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
      form: {}
    }
  },
  computed: {
    ...mapGetters(['dishType'])
  },
  created() {
    this.DishTypeAction()
    this.getList()
  },
  methods: {
    DishTypeAction() {
      this.$store.dispatch('dish/getDishType')
    },
    getList() {
      this.listLoading = true
      getDishList(this.listQuery).then((response) => {
        this.list = response.Data.DishList
        this.total = response.Data.Total
        this.list.forEach((element) => {
          element.dishTypeName = this.typeID2Name(element.DishTypeID)
        })
        this.listLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    typeID2Name: function(id) {
      var length = this.dishType.length
      for (var i = 0; i < length; i++) {
        if (this.dishType[i].ID === id) {
          return this.dishType[i].Name
        }
      }
    },
    handleUpdate: function(row) {
      this.dialogFormVisible = true
      this.form = Object.assign({}, row)
    },
    onSubmit: function(data) {
      updateDish(data).then((res) => {
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDish(ID).then((res) => {
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
