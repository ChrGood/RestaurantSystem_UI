<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="菜品名称">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="菜品类别">
        <el-select v-model="form.dishType" placeholder="选择菜品类别">
          <el-option v-for="item in dishType" :key="item.ID" :label="item.Name" :value="item.ID" />
        </el-select>
      </el-form-item>
      <el-form-item label="菜品图片">
        <el-upload
          class="upload-demo"
          action="http://192.168.90.100:54032/api/image/Upload"
          :on-success="uploadSuccess"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="菜品价格(元)">
        <el-input-number v-model="form.price" :min="1" :max="200" label="描述文字" />
      </el-form-item>
      <el-form-item label="可否半分">
        <el-switch v-model="form.isHalf" />
      </el-form-item>
      <el-form-item label="是否外卖">
        <el-switch v-model="form.isDeliver" />
      </el-form-item>
      <el-form-item label="是否有货">
        <el-switch v-model="form.isStock" />
      </el-form-item>
      <el-form-item label="菜品描述">
        <el-col :span="10">
          <el-input v-model="form.desc" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确    认</el-button>
        <el-button @click="onCancel">取    消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { inputDish } from '@/api/dish'
export default {
  name: 'DishInput',
  data() {
    return {
      form: {
        name: '',
        imagePath: '',
        price: 0,
        isDeliver: false,
        isHalf: false,
        dishType: '',
        isStock: true,
        desc: ''
      },
      uploadImageURL: ''
    }
  },
  computed: {
    ...mapGetters([
      'dishType'
    ])
  },
  created: function() {
    this.DishTypeAction()
  },
  methods: {
    DishTypeAction() {
      this.$store.dispatch('dish/getDishType')
    },
    onSubmit() {
      inputDish(this.form).then(res => {
        this.$message({
          message: res.Data,
          type: 'success'
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    uploadSuccess(res) {
      this.form.imagePath = res.Data
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

