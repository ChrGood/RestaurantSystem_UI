<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="菜品类别" name="first">
        <dishTypeManagement />
      </el-tab-pane>
      <el-tab-pane label="台面信息" name="second">台面信息</el-tab-pane>
      <el-tab-pane label="轮播图" name="third">
        <swiperImages />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import dishTypeManagement from '@/views/systemSettings/basicDataManagement/dishType/index'
import swiperImages from '@/views/systemSettings/basicDataManagement/swiperImages/index'
export default {
  components: {
    dishTypeManagement,
    swiperImages
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
