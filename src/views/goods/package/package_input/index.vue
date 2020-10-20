<template>
  <div class="app-container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="套餐名称">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="选择餐品">
        <el-transfer
          v-model="form.dishList"
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
        <el-col :span="5">
          <el-input-number v-model="form.discount" :min="0" :max="200" label="描述文字" />
        </el-col>
        <el-col :span="5">
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
          <el-input v-model="form.desc" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
        <el-button @click="onCancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getDishChose } from '@/api/dish'
import { inputPackage } from '@/api/package'
export default {
  data() {
    return {
      form: {
        name: '',
        imagePath: '',
        price: 0,
        discount: 0,
        dishList: [],
        isDeliver: false,
        isStock: true,
        desc: ''
      },
      dishChose: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      inputPackage(this.form).then(res => {
        this.$message({
          message: res.Data,
          type: 'success'
        })
      }).catch(e => {
        console.log(e)
      })
    },
    onCancel() {},
    handleChange() {
      var temp = this.form.dishList
      var totalPrice = 0
      temp.forEach((x) => {
        this.dishChose.forEach((z) => {
          if (z.key === x) {
            // console.log(z.price)
            totalPrice += z.price
          }
        })
      })
      this.form.price = totalPrice
    },
    getList() {
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
    }
  }
}
</script>
<style scoped>
.line {
  text-align: center;
}
</style>
